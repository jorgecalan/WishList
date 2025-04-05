import { Component, OnInit, inject } from '@angular/core';
import { Observable, of} from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  private router = inject(Router);
  
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

cargarWishlistEnCotizacion(): void {
  if (this.user) {
      this.FirebaseService.getWishlist(this.user.uid).then(wishlist => {
          const contenedor = document.getElementById('articulosCotizar');
          if (contenedor) {
              contenedor.innerHTML = ''; 

              wishlist.forEach(articulo => {
                  const div = document.createElement('div');
                  div.classList.add('mb-2');
                  div.innerHTML = `
                      <input type="text" class="form-control mb-2" value="${articulo.nombre}" readonly>
                      <input type="number" class="form-control mb-2" value="${articulo.cantidad}" readonly>
                      <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">Eliminar</button>
                  `;
                  contenedor.appendChild(div);
              });
          }
      }).catch(error => console.error("Error cargando wishlist:", error));
  }
}
sendQuotation(): void {
  // Verificar si el usuario ha iniciado sesión
  if (!this.user) {
    alert('Por favor, inicie sesión para poder realizar la cotización.');
    return;
  }

  this.wishlist$.subscribe(wishlist => {
    const itemsToQuote = wishlist.map(item => item.name); 
    const userId = this.user?.uid; 
    const pedidoId = this.generatePedidoId(); 
    const pedidoName = `Cotización para ${itemsToQuote.length} productos: ${itemsToQuote.join(', ')}`;

    if (userId && pedidoId && pedidoName) {
      this.FirebaseService.addToCotizacion(userId, pedidoId, pedidoName, itemsToQuote);
      this.router.navigate(['/pedido']); 
    } else {
      console.error('❌ No se pudo obtener el userId, pedidoId o pedidoName');
    }
  });
}



generatePedidoId(): string {
  return new Date().getTime().toString();
}
}


