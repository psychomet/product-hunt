import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { CheckoutService } from '@bigi-shop/checkout-data-access';
import { Cart } from '@bigi-shop/shared-util-types';

@Component({
  selector: 'bigi-checkout-process',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gray-50" *ngIf="activeStage$ | async as activeStage">
      <div class="lg:max-w-7xl max-w-2xl mx-auto pt-8 pb-24 px-4 sm:px-6 lg:px-8">
        <h2 class="sr-only">Checkout</h2>
        
        <!-- Stage Indicator -->
        <div class="mb-8">
          <nav aria-label="Progress">
            <ol role="list" class="flex items-center">
              <li class="relative pr-8 sm:pr-20" [class.text-primary-600]="activeStage >= 1">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="h-0.5 w-full" [class.bg-primary-600]="activeStage > 1" [class.bg-gray-200]="activeStage <= 1"></div>
                </div>
                <div class="relative flex items-center justify-center">
                  <span class="h-6 w-6 rounded-full text-center text-sm leading-6" 
                    [class.bg-primary-600]="activeStage >= 1" 
                    [class.text-white]="activeStage >= 1"
                    [class.bg-gray-200]="activeStage < 1">1</span>
                  <span class="absolute -bottom-6 text-sm font-medium">Sign In</span>
                </div>
              </li>
              <li class="relative pr-8 sm:pr-20" [class.text-primary-600]="activeStage >= 2">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="h-0.5 w-full" [class.bg-primary-600]="activeStage > 2" [class.bg-gray-200]="activeStage <= 2"></div>
                </div>
                <div class="relative flex items-center justify-center">
                  <span class="h-6 w-6 rounded-full text-center text-sm leading-6" 
                    [class.bg-primary-600]="activeStage >= 2" 
                    [class.text-white]="activeStage >= 2"
                    [class.bg-gray-200]="activeStage < 2">2</span>
                  <span class="absolute -bottom-6 text-sm font-medium">Shipping</span>
                </div>
              </li>
              <li class="relative pr-8 sm:pr-20" [class.text-primary-600]="activeStage >= 3">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                  <div class="h-0.5 w-full" [class.bg-primary-600]="activeStage > 3" [class.bg-gray-200]="activeStage <= 3"></div>
                </div>
                <div class="relative flex items-center justify-center">
                  <span class="h-6 w-6 rounded-full text-center text-sm leading-6" 
                    [class.bg-primary-600]="activeStage >= 3" 
                    [class.text-white]="activeStage >= 3"
                    [class.bg-gray-200]="activeStage < 3">3</span>
                  <span class="absolute -bottom-6 text-sm font-medium">Payment</span>
                </div>
              </li>
              <li class="relative" [class.text-primary-600]="activeStage >= 4">
                <div class="relative flex items-center justify-center">
                  <span class="h-6 w-6 rounded-full text-center text-sm leading-6" 
                    [class.bg-primary-600]="activeStage >= 4" 
                    [class.text-white]="activeStage >= 4"
                    [class.bg-gray-200]="activeStage < 4">4</span>
                  <span class="absolute -bottom-6 text-sm font-medium">Confirmation</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Main Content and Cart Summary -->
        <div [ngClass]="activeStage === 4 ? 'max-w-2xl mx-auto' : 'lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'">
          <div class="main">
            <router-outlet></router-outlet>
          </div>
          
          <div class="summary mt-10 lg:mt-0" *ngIf="cart$ | async as cart">
            <!-- Cart Summary -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              
              <div class="flow-root">
                <ul role="list" class="-my-6 divide-y divide-gray-200">
                  <li class="py-6 flex" *ngFor="let line of cart.lines">
                    <div class="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                      <img [src]="line.productVariant.featuredAsset?.preview" [alt]="line.productVariant.name" class="w-full h-full object-center object-cover">
                    </div>
                    <div class="ml-4 flex-1 flex flex-col">
                      <div>
                        <div class="flex justify-between text-base font-medium text-gray-900">
                          <h4>{{ line.productVariant.name }}</h4>
                          <p class="ml-4">{{ line.linePriceWithTax | currency }}</p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">Qty: {{ line.quantity }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="border-t border-gray-200 mt-6 pt-6">
                <div class="flex justify-between text-base font-medium text-gray-900 mb-2">
                  <p>Subtotal</p>
                  <p>{{ cart.subTotalWithTax | currency }}</p>
                </div>
                <div class="flex justify-between text-base font-medium text-gray-900 mb-2">
                  <p>Shipping</p>
                  <p>{{ cart.shippingWithTax | currency }}</p>
                </div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>{{ cart.totalWithTax | currency }}</p>
                </div>
              </div>
            </div>

            <!-- Shipping Address Card -->
            <div *ngIf="cart.shippingAddress?.streetLine1" class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
              <div class="text-sm text-gray-700">
                <p>{{ cart.shippingAddress.fullName }}</p>
                <p>{{ cart.shippingAddress.streetLine1 }}</p>
                <p *ngIf="cart.shippingAddress.streetLine2">{{ cart.shippingAddress.streetLine2 }}</p>
                <p>{{ cart.shippingAddress.city }}, {{ cart.shippingAddress.province }} {{ cart.shippingAddress.postalCode }}</p>
              </div>
              <button 
                *ngIf="activeStage === 3"
                (click)="changeShippingAddress()"
                class="mt-4 text-sm text-primary-600 hover:text-primary-500 font-medium">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProcessComponent implements OnInit {
  private checkoutService = inject(CheckoutService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  cart$ = this.checkoutService.getActiveOrder();
  activeStage$: Observable<number>;

  ngOnInit() {
    this.activeStage$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(true),
      map(() => {
        const firstChild = this.route.snapshot.firstChild;
        if (firstChild && firstChild.routeConfig) {
          switch (firstChild.routeConfig.path) {
            case '':
              return 1;
            case 'shipping':
              return 2;
            case 'payment':
              return 3;
            case 'confirmation/:code':
              return 4;
          }
        }
        return 1;
      }),
    );
  }

  changeShippingAddress() {
    this.router.navigate(['./shipping'], { relativeTo: this.route });
  }
} 