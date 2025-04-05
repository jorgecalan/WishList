import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MisionComponent } from './mision/mision.component';
import { VisionComponent } from './vision/vision.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PedidoComponent } from './pedido/pedido.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'wish', component: WishlistComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];




