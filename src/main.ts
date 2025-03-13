import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from './environments/environments';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';  // Asegúrate de tener definido un archivo de rutas
import { HomeComponent } from './app/home/home.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { enableProdMode } from '@angular/core';


if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideRouter(routes, withComponentInputBinding()),  // Agrega las rutas aquí
    provideFirestore(() => getFirestore())
  ],
}).catch(err => console.error(err));
