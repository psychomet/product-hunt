import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDataAccessComponent } from './account-data-access.component';

describe('AccountDataAccessComponent', () => {
  let component: AccountDataAccessComponent;
  let fixture: ComponentFixture<AccountDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
