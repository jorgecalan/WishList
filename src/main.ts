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
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';



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
    provideHttpClient(),
    importProvidersFrom(FormsModule) 
  ],
}).catch(err => console.error(err));
