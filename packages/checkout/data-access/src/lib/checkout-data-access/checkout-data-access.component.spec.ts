import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDataAccessComponent } from './checkout-data-access.component';

describe('CheckoutDataAccessComponent', () => {
  let component: CheckoutDataAccessComponent;
  let fixture: ComponentFixture<CheckoutDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
