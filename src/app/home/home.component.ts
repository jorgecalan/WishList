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

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user || null;
      this.user ? this.loadProductsAndWishlist() : this.resetProducts();
    });
  }

  async loadProductsAndWishlist() {
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

  async toggleWishlist(product: any, add: boolean) {
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

  async loginWithGoogle() {
    try {
      this.user = await this.authService.loginWithGoogle();
      console.log('✅ Usuario autenticado.');
      this.loadProductsAndWishlist();
    } catch (error) {
      console.error('❌ Error al iniciar sesión:', error);
    }
  }

  async logout() {
    await this.authService.logout();
    this.resetProducts();
    console.log('🔴 Usuario desconectado.');
  }

  private resetProducts() {
    this.user = null;
    this.arrayproducts.forEach(p => (p.addedToWishList = false));
  }

  // Nueva función para obtener el color de fondo
  getFondoColor(color: string): string {
    switch (color.toLowerCase()) {
      case 'oro':
        return '#d2b250'; // Mas vendido
      case 'plata':
        return '#c5ced4'; // Ventas normales
      case 'bronce':
        return '#c68651'; // Menos vendidos
      default:
        return '#FFFFFF'; // Por defecto
    }
  }
}

