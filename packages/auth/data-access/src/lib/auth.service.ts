import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!, $rememberMe: Boolean) {
    login(username: $username, password: $password, rememberMe: $rememberMe) {
      ... on CurrentUser {
        id
        identifier
      }
      ... on InvalidCredentialsError {
        errorCode
        message
      }
      ... on NotVerifiedError {
        errorCode
        message
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterCustomerInput!) {
    registerCustomerAccount(input: $input) {
      ... on Success {
        success
      }
      ... on MissingPasswordError {
        errorCode
        message
      }
      ... on PasswordValidationError {
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
    }
  }
`;

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      identifier
    }
  }
`;

export interface AuthUser {
  id: string;
  identifier: string;
}

export interface RegisterInput {
  emailAddress: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export interface AuthError {
  errorCode: string;
  message: string;
}

export type AuthResult = AuthUser | AuthError;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private apollo: Apollo) {
    this.checkAuthStatus();
  }

  login(username: string, password: string, rememberMe = false): Observable<AuthResult> {
    return this.apollo.mutate<{ login: AuthResult }>({
      mutation: LOGIN_MUTATION,
      variables: { username, password, rememberMe }
    }).pipe(
      map(result => result.data!.login),
      tap(result => {
        if ('id' in result) {
          this.currentUserSubject.next(result);
        }
      })
    );
  }

  register(input: RegisterInput): Observable<{ success: boolean } | AuthError> {
    return this.apollo.mutate<{ registerCustomerAccount: { success: boolean } | AuthError }>({
      mutation: REGISTER_MUTATION,
      variables: { input }
    }).pipe(
      map(result => result.data!.registerCustomerAccount)
    );
  }

  logout(): Observable<boolean> {
    return this.apollo.mutate<{ logout: { success: boolean } }>({
      mutation: LOGOUT_MUTATION
    }).pipe(
      map(result => result.data!.logout.success),
      tap(success => {
        if (success) {
          this.currentUserSubject.next(null);
        }
      })
    );
  }

  private checkAuthStatus() {
    this.apollo.query<{ me: AuthUser | null }>({
      query: GET_CURRENT_USER
    }).subscribe({
      next: result => {
        if (result.data.me) {
          this.currentUserSubject.next(result.data.me);
        }
      },
      error: () => {
        this.currentUserSubject.next(null);
      }
    });
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
} 