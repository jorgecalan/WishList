import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arrayproducts: any[] = [];  
  user: any;                 
  wishlist: Set<string> = new Set(); // Guardamos solo los IDs en un Set

  constructor(
    private authService: AuthService, 
    private firebaseService: FirebaseService,  
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.authService.getUser().subscribe(async user => {
        if (user) {
            this.user = user;

            try {
                // 1️⃣ Obtener la wishlist PRIMERO
                const wishlist = await this.firebaseService.getWishlist(user.uid);
                this.wishlist = new Set(wishlist.map(item => item.id)); // Convertir a Set para búsqueda rápida

                // 2️⃣ Obtener los productos
                this.arrayproducts = await this.firebaseService.getProducts();

                // 3️⃣ Marcar productos que estén en la wishlist
                this.arrayproducts.forEach(product => {
                    product.addedToWishList = this.wishlist.has(product.id);
                });

                this.cdr.detectChanges(); // Forzar actualización de la vista
            } catch (error) {
                console.error("❌ Error cargando datos:", error);
            }
        } else {
            console.log('No authenticated user');
            this.user = null;
            this.arrayproducts.forEach(product => product.addedToWishList = false);
        }
    });
}



  async handleAddWishList(product: any) {
    if (this.user) {
      try {
        await this.firebaseService.addToWishlist(this.user.uid, product);
        product.addedToWishList = true;
        this.wishlist.add(product.id);
      } catch (error) {
        console.error('❌ Error agregando al wishlist:', error);
      }
    } else {
      alert('⚠️ Por favor, inicie sesión para agregar productos a Favoritos.');
    }
  }

  async handleRemoveWishList(product: any) {
    if (this.user) {
      try {
        await this.firebaseService.removeFromWishlist(this.user.uid, product.id);
        product.addedToWishList = false;
        this.wishlist.delete(product.id);
      } catch (error) {
        console.error('❌ Error eliminando del wishlist:', error);
      }
    } else {
      alert('⚠️ Por favor, inicie sesión para quitar productos de Favoritos.');
    }
  }

  async loginWithGoogle() {
    try {
      const user = await this.authService.loginWithGoogle();
      this.user = user;
      console.log('Usuario autenticado:', user);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  }

  async logout() {
    await this.authService.logout();
    this.user = null;
    this.arrayproducts.forEach(product => product.addedToWishList = false);
    console.log('Usuario desconectado');
  }
}
