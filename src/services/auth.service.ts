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
      const auth = getAuth();  // Obtenemos la instancia de autenticación
      const provider = new GoogleAuthProvider();  // Proveedor de autenticación de Google
      const result = await signInWithPopup(auth, provider);  // Usa 'signInWithPopup' para el inicio de sesión
      console.log('Usuario logueado:', result.user);  // Información del usuario autenticado
      return result.user;  // Devuelve el usuario
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);  // Manejo de errores
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      const auth = getAuth();  // Obtenemos la instancia de autenticación
      await signOut(auth);  // Cierra la sesión del usuario
      console.log('Usuario desconectado');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);  // Manejo de errores
    }
  }

  // Obtener el estado del usuario (observa los cambios del estado de autenticación)
  getUser(): Observable<User | null> {
    const auth = getAuth();  // Obtenemos la instancia de autenticación
    return new Observable<User | null>((observer) => {
      onAuthStateChanged(auth, (user) => {
        observer.next(user);  // Emitimos el usuario cuando cambia el estado
      });
    });
  }
}

