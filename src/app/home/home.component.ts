import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arrayproducts: any[] = [];
  user: any;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
  ) {}

  
  ngOnInit() {   //Inicializa el componente y carga los datos si el usuario está autenticado  
    this.authService.getUser().subscribe(user => {
      this.user = user || null;
      this.user ? this.loadProductsAndWishlist() : this.resetProducts();
    });
  }

  async loadProductsAndWishlist() {  //Obtiene los productos y la wishlist del usuario para sincronizarlos.
    try {
      this.arrayproducts = (await this.firebaseService.getProducts()).map(p => ({
        ...p,
        addedToWishList: false
      }));

      if (!this.arrayproducts.length) return console.log('⚠️ No hay productos.');

      const wishlist = await this.firebaseService.getWishlist(this.user.uid);
      if (!wishlist.length) return console.log('📌 No hay wishlist.');

      const wishlistIds = new Set(wishlist.map(item => item.id));
      this.arrayproducts.forEach(p => (p.addedToWishList = wishlistIds.has(p.id)));

      console.log('✅ Productos sincronizados.');
    } catch (error) {
      console.error("❌ Error cargando datos:", error);
    }
  }

  async toggleWishlist(product: any, add: boolean) { //Agrega o elimina un producto de la wishlist según su estado.
    if (!this.user) return alert('⚠️ Debes iniciar sesión.');

    try {
      add 
        ? await this.firebaseService.addToWishlist(this.user.uid, product)
        : await this.firebaseService.removeFromWishlist(this.user.uid, product.id);

      product.addedToWishList = add;
      console.log(`✅ Producto ${add ? 'agregado a' : 'eliminado de'} wishlist.`);
    } catch (error) {
      console.error(`❌ Error al ${add ? 'agregar' : 'eliminar'} de wishlist:`, error);
    }
  }

  async loginWithGoogle() { //Inicia sesión con Google y carga los productos y la wishlist.
    try {
      this.user = await this.authService.loginWithGoogle();
      console.log('✅ Usuario autenticado.');
      this.loadProductsAndWishlist();
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
    }
  }

  async logout() {  //Cierra sesión y limpia los datos del usuario y los productos.
    await this.authService.logout();
    this.resetProducts();    
    console.log('🔴 Usuario desconectado.');
  }

  private resetProducts() { //Limpia la información del usuario y marca todos los productos como no añadidos a la wishlist.
    this.user = null;
    this.arrayproducts.forEach(p => (p.addedToWishList = false, this.firebaseService.refreshPage()));
    
  }
}
