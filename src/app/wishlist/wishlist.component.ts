import { Component, OnInit, inject } from '@angular/core';
import { Observable, of, from } from 'rxjs';
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
  wishlist$: Observable<any[]> = of([]);  // Lista de productos en la wishlist
  user: any;

  private FirebaseService = inject(FirebaseService);
  private authService = inject(AuthService);
  
  constructor() {}

  ngOnInit(): void {
    // Obtener usuario y cargar la wishlist
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
        this.wishlist$ = of(wishlist); // Ahora wishlist es un array con productos completos
      });
    }
  }
  

  // Método para eliminar un producto de la wishlist
  handleRemoveWishList(product: any): void {
    if (this.user) {
      this.FirebaseService.removeFromWishlist(this.user.uid, product.id)
        .then(() => {
          this.loadWishlist();
        })
        .catch(error => {
          console.error('Error eliminando del wishlist:', error);
        });
    } else {
      alert('Por favor, inicie sesión para quitar productos de su lista de deseos.');
    }
  }
}


