import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountAddressBookComponent } from './account-address-book.component';

describe('AccountAddressBookComponent', () => {
  let component: AccountAddressBookComponent;
  let fixture: ComponentFixture<AccountAddressBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountAddressBookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountAddressBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
