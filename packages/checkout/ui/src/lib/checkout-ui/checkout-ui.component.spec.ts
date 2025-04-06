import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutUiComponent } from './checkout-ui.component';

describe('CheckoutUiComponent', () => {
  let component: CheckoutUiComponent;
  let fixture: ComponentFixture<CheckoutUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
