import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
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
  wishlist$: Observable<any> = new Observable(); 


  constructor(
    private authService: AuthService, 
    private firebaseService: FirebaseService,  
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Obtener productos desde Realtime Database usando FirebaseService
    this.firebaseService.getProducts().then(products => {
      this.arrayproducts = products.map(product => ({
        ...product,
        addedToWishList: false 
      }));
    });

    // Obtener el wishlist del usuario desde Firestore
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.firebaseService.getWishlist(user.uid).then(wishlist => {  
          this.wishlist$ = of(wishlist); 
          
          // Marcar los productos en la wishlist
          this.arrayproducts.forEach(product => {
            product.addedToWishList = wishlist.some((item: any) => item.id === product.id);
          });

          this.cdr.detectChanges(); 
        });
      } else {
        console.log('No authenticated user');
        this.user = null;
      }
    });
  }

  // Agregar producto al wishlist usando FirebaseService
  async handleAddWishList(product: any) {
    if (this.user) {
      product.addedToWishList = true;
      try {
        await this.firebaseService.addToWishlist(this.user.uid, product);
        console.log('✅ Producto agregado a wishlist');
      } catch (error) {
        console.error('❌ Error agregando al wishlist:', error);
      }
    } else {
      alert('⚠️ Por favor, inicie sesión para agregar productos a su lista de deseos.');
    }
}


  // Eliminar producto del wishlist usando FirebaseService
  async handleRemoveWishList(product: any) {
    if (this.user) {
      product.addedToWishList = false;
      try {
        await this.firebaseService.removeFromWishlist(this.user.uid, product.id);
        console.log('Producto eliminado del wishlist');
      } catch (error) {
        console.error('Error eliminando del wishlist:', error);
      }
    } else {
      alert('Por favor, inicie sesión para quitar productos de su lista de deseos.');
    }
  }

  // Función para iniciar sesión con Google
  async loginWithGoogle() {
    try {
      const user = await this.authService.loginWithGoogle();
      this.user = user;
      console.log('Usuario autenticado:', user);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  }

  // Función para cerrar sesión
  async logout() {
    await this.authService.logout();
    this.user = null;
    console.log('Usuario desconectado');
  }
}