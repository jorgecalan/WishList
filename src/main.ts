import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { environment } from './environments/environment';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';  
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { enableProdMode } from '@angular/core';
import { provideAuth, getAuth } from '@angular/fire/auth';



if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideRouter(routes, withComponentInputBinding()), 
  ],
}).catch(err => console.error(err));
