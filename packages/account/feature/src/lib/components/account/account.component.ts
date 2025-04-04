import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'bigi-shop-account',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="account-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .account-layout {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
  `]
})
export class AccountComponent {} 