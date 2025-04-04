import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountOrderListComponent } from './account-order-list.component';

describe('AccountOrderListComponent', () => {
  let component: AccountOrderListComponent;
  let fixture: ComponentFixture<AccountOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountOrderListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
