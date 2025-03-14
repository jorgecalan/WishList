import { Injectable } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, User, onAuthStateChanged } from 'firebase/auth';  // Firebase v9+ modular imports
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Iniciar sesión con Google
  async loginWithGoogle() {
    try {
      const auth = getAuth();  
      const provider = new GoogleAuthProvider();  
      const result = await signInWithPopup(auth, provider);  
      console.log('Usuario logueado:', result.user);  
      return result.user; 
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);  
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      const auth = getAuth();  
      await signOut(auth);  
      console.log('Usuario desconectado');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);  
    }
  }

  // Obtener el estado del usuario (observa los cambios del estado de autenticación)
  getUser(): Observable<User | null> {
    const auth = getAuth();  
    return new Observable<User | null>((observer) => {
      onAuthStateChanged(auth, (user) => {
        observer.next(user);  
      });
    });
  }
}

