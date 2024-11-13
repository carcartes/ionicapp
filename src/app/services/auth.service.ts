import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticatedSubject.asObservable();

  constructor(private afAuth: AngularFireAuth) {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.authenticatedSubject.next(true);
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  }

  async register(name: string, surname: string, email: string, dob: string, password: string): Promise<boolean> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: `${name} ${surname}`
        });
      }

      this.authenticatedSubject.next(true);
      return true;
    } catch (error) {
      console.error('Error en register:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.authenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.authenticatedSubject.value;
  }

  // Función corregida para devolver una promesa con el UID
  async getUsuarioId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;  // Obtener el usuario actual
    return user ? user.uid : null;  // Devolver el UID si hay usuario, sino null
  }
}
