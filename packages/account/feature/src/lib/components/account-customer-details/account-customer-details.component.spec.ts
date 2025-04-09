import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCustomerDetailsComponent } from './account-customer-details.component';

describe('AccountCustomerDetailsComponent', () => {
  let component: AccountCustomerDetailsComponent;
  let fixture: ComponentFixture<AccountCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCustomerDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
