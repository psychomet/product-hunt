import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { CurrentUser } from '@bigi-shop/shared/util-types';

export interface AppState {
  currentUser: CurrentUser | null;
  activeOrderId: string | null;
  lastCollectionSlug: string | null;
  mobileNavMenuIsOpen: boolean;
  cartDrawerOpen: boolean;
}

export const initialState: AppState = {
  currentUser: null,
  activeOrderId: null,
  lastCollectionSlug: null,
  mobileNavMenuIsOpen: false,
  cartDrawerOpen: false,
};

/**
 * A simple, observable store of global app state.
 * Based on Vendure's storefront starter state service.
 */
@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state: AppState = initialState;
  private readonly stateSubject = new BehaviorSubject<AppState>(initialState);

  constructor() {
    // For debugging purposes in development
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'appState', {
        get: () => this.stateSubject.value,
      });
    }
  }

  setState<T extends keyof AppState>(key: T, value: AppState[T]) {
    this.state[key] = value;
    this.stateSubject.next(this.state);
  }

  select<R>(selector: (state: AppState) => R): Observable<R> {
    return this.stateSubject.pipe(
      map(selector),
      distinctUntilChanged(),
    );
  }

  // Convenience selectors
  get isAuthenticated$(): Observable<boolean> {
    return this.select(state => !!state.currentUser);
  }

  get currentUser$(): Observable<CurrentUser | null> {
    return this.select(state => state.currentUser);
  }

  get activeOrderId$(): Observable<string | null> {
    return this.select(state => state.activeOrderId);
  }

  get mobileNavMenuIsOpen$(): Observable<boolean> {
    return this.select(state => state.mobileNavMenuIsOpen);
  }

  get cartDrawerOpen$(): Observable<boolean> {
    return this.select(state => state.cartDrawerOpen);
  }

  // Actions
  setCurrentUser(user: CurrentUser | null) {
    this.setState('currentUser', user);
  }

  setActiveOrderId(orderId: string | null) {
    this.setState('activeOrderId', orderId);
  }

  setLastCollectionSlug(slug: string | null) {
    this.setState('lastCollectionSlug', slug);
  }

  toggleMobileNavMenu(isOpen?: boolean) {
    const newValue = isOpen ?? !this.state.mobileNavMenuIsOpen;
    this.setState('mobileNavMenuIsOpen', newValue);
  }

  toggleCartDrawer(isOpen?: boolean) {
    const newValue = isOpen ?? !this.state.cartDrawerOpen;
    this.setState('cartDrawerOpen', newValue);
  }

  logout() {
    this.setState('currentUser', null);
    this.setState('activeOrderId', null);
  }
} 