import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticatedSubject.asObservable();

  login(username: string, password: string): boolean {
    // Aquí debes verificar las credenciales con tu backend
    if (username === 'test@example.com' && password === 'password') {
      this.authenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  register(name: string, surname: string, email: string, dob: string, password: string): boolean {
    // Aquí debes agregar la lógica para registrar al usuario en tu backend
    // Por ahora, autenticamos al usuario directamente
    this.authenticatedSubject.next(true);
    return true; // Cambia esto según la lógica de tu backend
  }

  logout() {
    this.authenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.authenticatedSubject.value;
  }
}
