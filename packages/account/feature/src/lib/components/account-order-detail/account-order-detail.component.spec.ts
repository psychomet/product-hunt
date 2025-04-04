import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountOrderDetailComponent } from './account-order-detail.component';

describe('AccountOrderDetailComponent', () => {
  let component: AccountOrderDetailComponent;
  let fixture: ComponentFixture<AccountOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountOrderDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
