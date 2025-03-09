import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MisionComponent } from './mision/mision.component';
import { VisionComponent } from './vision/vision.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'vision', component: VisionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];




