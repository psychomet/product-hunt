import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddressDetailComponent } from './account-address-detail.component';

describe('AccountAddressDetailComponent', () => {
  let component: AccountAddressDetailComponent;
  let fixture: ComponentFixture<AccountAddressDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountAddressDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountAddressDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
