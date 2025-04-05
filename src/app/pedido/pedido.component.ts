import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class PedidoComponent implements OnInit {
  articulosCotizar: any[] = [];
  user: any;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.loadCotizacion();
      }
    });
  }

  async loadCotizacion(): Promise<void> {
    if (this.user) {
      this.articulosCotizar = await this.firebaseService.getCotizacion(this.user.uid);
    }
  }

  async buttonRemoveQuote(pedido: any) {
    if (!this.user) {
        alert('Por favor, inicie sesión para quitar productos de sus cotizaciones');
        return;
    }
    try {
        await this.firebaseService.DeleteQuote(this.user.uid, pedido.id);
        this.loadCotizacion();  // Recarga la cotización después de eliminar
    } catch (error) {
        console.error('❌ Error eliminando del wishlist:', error);
    }
}
checkUserBeforeCotizar(): void {
  if (!this.user) {
    alert('Por favor, inicie sesión para poder realizar la cotización.');
    return;
  }
  const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const telefono = (document.getElementById('telefono') as HTMLInputElement).value;
  const cantidad = (document.getElementById('cantidad') as HTMLInputElement).value;

  if (!nombre || !email || !telefono || !cantidad) {
    alert('Por favor, complete todos los campos antes de enviar la cotización.');
    return;
  }
  alert('Cotización enviada. Uno de nuestros asesores lo contactará pronto.');
}
}

