import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { DataService, StateService } from '@bigi-shop/shared/data-access';
import { CollectionsMenuComponent } from '@bigi-shop/shared/ui';
import { SIGN_OUT } from './shell-layout.graphql';

@Component({
  selector: 'lib-shell-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, CollectionsMenuComponent],
  template: `
    <div class="shell-container">
      <header class="header">
        <nav class="nav">
          <div class="nav-brand">
            <a routerLink="/" class="brand-link">Bigi Shop</a>
          </div>
          
          <bigi-collections-menu></bigi-collections-menu>
          
          <div class="nav-links">            
            <ng-container *ngIf="state.currentUser$ | async as user; else authLinks">
              <div class="user-menu">
                <span class="user-name">{{ user.identifier }}</span>
                <div class="dropdown-menu">
                  <a routerLink="/account/dashboard" class="menu-item">My Account</a>
                  <button class="menu-item" (click)="signOut()">Logout</button>
                </div>
              </div>
            </ng-container>
            
            <ng-template #authLinks>
              <a routerLink="/account/sign-in" class="nav-link">Sign In</a>
              <a routerLink="/account/register" class="nav-link register">Register</a>
            </ng-template>

            <button 
              class="cart-button" 
              (click)="state.toggleCartDrawer()"
              [class.has-items]="state.activeOrderId$ | async"
            >
              Cart
            </button>
          </div>
        </nav>
      </header>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <footer class="footer">
        <div class="footer-content">
          <p>&copy; 2024 Bigi Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .shell-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .header {
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .brand-link {
      color: #333;
      text-decoration: none;
      
      &:hover {
        color: #007bff;
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .nav-link {
      color: #666;
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        color: #007bff;
      }

      &.register {
        background-color: #007bff;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        
        &:hover {
          background-color: #0056b3;
          color: white;
        }
      }
    }

    .user-menu {
      position: relative;
      cursor: pointer;

      &:hover .dropdown-menu {
        display: block;
      }
    }

    .user-name {
      color: #333;
      font-weight: 500;
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 0.5rem;
      min-width: 150px;
    }

    .menu-item {
      display: block;
      padding: 0.5rem;
      color: #666;
      text-decoration: none;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      font-size: 1rem;
      
      &:hover {
        background-color: #f8f9fa;
        color: #007bff;
      }
    }

    .cart-button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      color: #666;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;

      &:hover {
        background-color: #f8f9fa;
        border-color: #007bff;
        color: #007bff;
      }

      &.has-items {
        background-color: #007bff;
        border-color: #007bff;
        color: white;

        &:hover {
          background-color: #0056b3;
        }
      }
    }

    .main-content {
      flex: 1;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
      width: 100%;
    }

    .footer {
      background-color: #f8f9fa;
      padding: 2rem 0;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      text-align: center;
      color: #666;
    }
  `]
})
export class ShellLayoutComponent {
  constructor(
    public dataService: DataService,
    public state: StateService,
    private router: Router
  ) {}

  signOut() {
    this.dataService.mutate(SIGN_OUT).subscribe(() => {
      this.state.setCurrentUser(null);
      this.dataService.resetStore();
      this.router.navigate(['/']);
    });
  }
} 