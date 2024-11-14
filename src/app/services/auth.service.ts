// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticatedSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Método para obtener los datos del usuario desde Firestore
  async getUserData(uid: string) {
    try {
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
      if (userDoc && userDoc.exists) {  // Verificar si el documento existe y está definido
        return userDoc.data();  // Retornar los datos si existen
      } else {
        return null;  // Si no existe, retornar null
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;  // Si ocurre un error, retornar null
    }
  }

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

  async register(name: string, surname: string, email: string, dob: string, password: string, phone: string): Promise<boolean> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (userCredential.user) {
        // Actualizar el perfil con el nombre completo
        await userCredential.user.updateProfile({
          displayName: `${name} ${surname}`
        });

        // Almacenar información adicional en Firestore
        await this.firestore.collection('users').doc(userCredential.user.uid).set({
          name: name,
          surname: surname,
          email: email,
          dob: dob,
          phone: phone
        });

        // Cambiar estado de autenticación
        this.authenticatedSubject.next(true);
        return true;
      }

      return false;
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

  async getUsuarioId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }
  async updateUserData(uid: string, userData: any) {
    try {
      await this.firestore.collection('users').doc(uid).update(userData);
      console.log('Datos del usuario actualizados en Firestore');
    } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
    }
  }
  
  
}
