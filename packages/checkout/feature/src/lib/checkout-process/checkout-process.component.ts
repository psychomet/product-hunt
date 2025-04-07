import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Router,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import {
  GetNextOrderStatesQuery,
  GetOrderForCheckoutQuery,
  TransitionToAddingItemsMutation,
} from '@bigi-shop/shared-util-types';
import { DataService, StateService } from '@bigi-shop/shared-data-access';
import {
  GET_NEXT_ORDER_STATES,
  TRANSITION_TO_ADDING_ITEMS,
} from './checkout-process.graphql';
import { CheckoutStageIndicatorComponent } from '@bigi-shop/checkout-ui';
import {
  AddressCardComponent,
  CartContentsComponent,
  CartTotalsComponent,
} from '@bigi-shop/shared-ui';

@Component({
  selector: 'bigi-checkout-process',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CheckoutStageIndicatorComponent,
    CartContentsComponent,
    CartTotalsComponent,
    AddressCardComponent,
  ],
  template: `
    <div class="bg-gray-50" *ngIf="activeStage$ | async as activeStage">
      <div
        class="lg:max-w-7xl max-w-2xl mx-auto pt-8 pb-24 px-4 sm:px-6 lg:px-8"
      >
        <h2 class="sr-only">Checkout</h2>
        <bigi-checkout-stage-indicator
          [activeStage]="activeStage"
          [signedIn]="signedIn$ | async"
        />

        <div
          class="lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          [ngClass]="
            activeStage === 4 ? 'max-w-2xl mx-auto' : 'lg:grid lg:grid-cols-2'
          "
        >
          <div class="main">
            <router-outlet></router-outlet>
          </div>
          <div class="summary" *ngIf="cart$ | async as cart">
            <bigi-cart-contents [cart]="cart" class="mb-3" />
            <bigi-cart-totals [cart]="cart" />
            <bigi-address-card
              *ngIf="cart.shippingAddress?.streetLine1"
              class="w-48 block"
              title="Shipping address"
              [address]="cart.shippingAddress"
            >
              <button
                class="border px-2 py-1 mt-2 rounded text-sm hover:bg-gray-100"
                *ngIf="(activeStage$ | async) === 3"
                (click)="changeShippingAddress()"
              >
                Change
              </button>
            </bigi-address-card>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutProcessComponent implements OnInit {
  cart$: Observable<GetOrderForCheckoutQuery['activeOrder'] | null | undefined>;
  nextStates$: Observable<string[]>;
  activeStage$: Observable<number>;
  signedIn$: Observable<boolean>;
  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.signedIn$ = this.stateService.select((state) => state.signedIn);
    this.cart$ = this.route.data.pipe(
      switchMap(
        (data) =>
          data['activeOrder'] as Observable<
            GetOrderForCheckoutQuery['activeOrder']
          >
      )
    );
    this.nextStates$ = this.dataService
      .query<GetNextOrderStatesQuery>(GET_NEXT_ORDER_STATES)
      .pipe(map((data) => data.nextOrderStates as string[]));
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
      })
    );
  }

  changeShippingAddress() {
    this.dataService
      .mutate<TransitionToAddingItemsMutation>(TRANSITION_TO_ADDING_ITEMS)
      .subscribe(() => {
        this.router.navigate(['./shipping'], { relativeTo: this.route });
      });
  }
}
