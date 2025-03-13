import { Injectable, inject } from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database'; // Realtime Database
import { Firestore, collection, doc, setDoc, getDocs, deleteDoc, collectionData } from '@angular/fire/firestore'; // Firestore
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db = inject(Database); 
  private firestore = inject(Firestore); 
  wishlist$: Observable<any[]> = of([]);

  // Obtener los productos desde Realtime Database
  async getProducts(): Promise<any[]> {
    const dbRef = ref(this.db);
    try {
      const snapshot = await get(child(dbRef, 'productos')); 
      if (snapshot.exists()) {
        return Object.values(snapshot.val()); 
      } else {
        console.log('No se encontraron productos');
        return [];
      }
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      return [];
    }
  }

  // Guardar un artículo en Firestore
  async addToWishlist(userId: string, product: any): Promise<void> {
    if (!product || !product.id) {
        console.error("❌ Error: El producto no tiene ID válido", product);
        return;
    }

    const productId = String(product.id); 
    const wishlistRef = doc(this.firestore, `wishlists/${userId}/items/${productId}`);

    try {
        await setDoc(wishlistRef, {
            id: productId,
            name: product.name || 'Producto sin nombre',
            price: product.price || 0,
            description: product.description || '',
            imageUrl: product.imageUrl || 'assets/default.jpg',
            timestamp: new Date().toISOString()
        });

        console.log("✅ Producto agregado a wishlist:", product);
    } catch (error) {
        console.error("❌ Error agregando al wishlist:", error);
    }
}


  // Obtener los artículos de la wishlist de Firestore
  async getWishlist(userId: string): Promise<any[]> {
    const wishlistRef = collection(this.firestore, `wishlists/${userId}/items`);
    this.wishlist$ = collectionData(wishlistRef, { idField: 'id' });
    try {
      const snapshot = await getDocs(wishlistRef);
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error("❌ Error obteniendo la wishlist:", error);
      return [];
    }
  }

  // Eliminar un artículo de la wishlist en Firestore
  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    if (!productId) {
        console.error("❌ Error: El ID del producto es inválido.");
        return;
    }

    const wishlistRef = doc(this.firestore, `wishlists/${userId}/items/${productId}`);
    try {
        await deleteDoc(wishlistRef);
        console.log("✅ Producto eliminado del wishlist:", productId);
        // Después de eliminar, actualizamos la lista de productos
        // Llamar al método que obtiene la lista de wishlist
        // Asegúrate de que `getWishlist()` devuelve una lista de productos actualizada
    } catch (error) {
        console.error("❌ Error eliminando del wishlist:", error);
    }
}
}

