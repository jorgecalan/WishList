import { Injectable} from '@angular/core';
import { Database, ref, get, child } from '@angular/fire/database';
import { Firestore, collection, doc, setDoc, getDocs, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private db: Database, 
    private firestore: Firestore,
    private router: Router
  ) {}

  async getProducts(): Promise<any[]> {  //Obtiene la lista de productos desde Realtime Database.
    try {
      const snapshot = await get(child(ref(this.db), 'productos'));
      return snapshot.exists() ? snapshot.val() : [];
    } catch (error) {
      console.error('❌ Error obteniendo productos:', error);
      return [];
    }
  }

  async addToWishlist(userId: string, product: any): Promise<void> { //Agrega un producto a la wishlist del usuario en Firestore.
    if (!product?.id) {
      console.error("❌ Error: Producto sin ID válido", product);
      return;
    }

    try {
      await setDoc(doc(this.firestore, `wishlists/${userId}/items/${product.id}`), {
        id: product.id,
        name: product.name || 'Producto sin nombre',
        price: product.price || 0,
        description: product.description || '',
        imageUrl: product.imageUrl || 'assets/default.jpg',
        timestamp: new Date().toISOString()
      });
      console.log("✅ Producto agregado a wishlist:", product);
    } catch (error) {
      console.error("❌ Error agregando a wishlist:", error);
    }
  }

  async getWishlist(userId: string): Promise<any[]> { //Obtiene la wishlist del usuario desde Firestore.
    try {
      const snapshot = await getDocs(collection(this.firestore, `wishlists/${userId}/items`));
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error("❌ Error obteniendo wishlist:", error);
      return [];
    }
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> { //Elimina un producto de la wishlist del usuario en Firestore.
    try {
      await deleteDoc(doc(this.firestore, `wishlists/${userId}/items/${productId}`));
      console.log(`✅ Producto ${productId} eliminado de wishlist`);
    } catch (error) {
      console.error("❌ Error eliminando de wishlist:", error);
    }
  }

  //Sincroniza los productos con la wishlist del usuario.
  async syncWishlistWithProducts(userId: string, arrayProducts: any[]): Promise<void> {
    const wishlistIds = new Set((await this.getWishlist(userId)).map(item => item.id));
    arrayProducts.forEach(product => product.addedToWishList = wishlistIds.has(product.id));
  }

  refreshPage() { // Acualizar la pagina
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }
}
