import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasStoredAuthToken());
  
  readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {
    this.checkInitialAuthState();
  }

  private checkInitialAuthState() {
    const hasToken = this.hasStoredAuthToken();
    this.isAuthenticatedSubject.next(hasToken);
  }

  private hasStoredAuthToken(): boolean {
    return !!localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  private setAuthToken(token: string) {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
  }

  private removeAuthToken() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  login(email: string, password: string): Observable<boolean> {
    // TODO: Implement login mutation
    return new Observable(subscriber => {
      // Temporary mock implementation
      if (email && password) {
        this.setAuthToken('mock-token');
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
      subscriber.complete();
    });
  }

  logout(): Observable<boolean> {
    // TODO: Implement logout mutation
    return new Observable(subscriber => {
      this.removeAuthToken();
      this.apollo.client.resetStore();
      this.router.navigate(['/account/sign-in']);
      subscriber.next(true);
      subscriber.complete();
    });
  }

  register(email: string, password: string): Observable<boolean> {
    // TODO: Implement register mutation
    return new Observable(subscriber => {
      // Temporary mock implementation
      if (email && password) {
        this.setAuthToken('mock-token');
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
      subscriber.complete();
    });
  }

  requestPasswordReset(email: string): Observable<boolean> {
    // TODO: Implement request password reset mutation
    return new Observable(subscriber => {
      subscriber.next(true);
      subscriber.complete();
    });
  }

  resetPassword(token: string, password: string): Observable<boolean> {
    // TODO: Implement reset password mutation
    return new Observable(subscriber => {
      if (token && password) {
        this.setAuthToken('mock-token');
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
      subscriber.complete();
    });
  }

  verifyEmail(token: string): Observable<boolean> {
    // TODO: Implement verify email mutation
    return new Observable(subscriber => {
      subscriber.next(true);
      subscriber.complete();
    });
  }

  changeEmailAddress(newEmail: string): Observable<boolean> {
    // TODO: Implement change email mutation
    return new Observable(subscriber => {
      subscriber.next(true);
      subscriber.complete();
    });
  }
} 