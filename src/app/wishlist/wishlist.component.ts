import { Component, OnInit, inject } from '@angular/core';
import { Observable, of} from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  imports: [CommonModule, FormsModule]
})
export class WishlistComponent implements OnInit {
  wishlist$: Observable<any[]> = of([]);
  user: any;

  private FirebaseService = inject(FirebaseService);
  private authService = inject(AuthService);
  
  constructor() {}


   // Obtener usuario y cargar la wishlist
  ngOnInit(): void {
   
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.loadWishlist(); 
      }
    });
  }

  // Método para cargar la wishlist
  loadWishlist(): void {
    if (this.user) {
      this.FirebaseService.getWishlist(this.user.uid).then(wishlist => {
        this.wishlist$ = of(wishlist);
      });
    }
  }
  

  // Método para eliminar un producto de la wishlist
  async handleRemoveWishList(product: any) {
    if (!this.user) {
        alert('Por favor, inicie sesión para quitar productos de su lista de deseos.');
        return;
    }
    try {
        await this.FirebaseService.removeFromWishlist(this.user.uid, product.id);
        this.loadWishlist();
    } catch (error) {
        console.error('❌ Error eliminando del wishlist:', error);
    }
}
}

