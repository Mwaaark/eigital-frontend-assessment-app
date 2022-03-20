import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated(): boolean {
    const email = localStorage.getItem('email');
    return !!email;
  }

  login(email: string) {
    localStorage.setItem('email', email);
  }

  logout() {
    localStorage.removeItem('email');
  }
}
