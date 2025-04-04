import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountChangeCredentialsComponent } from './account-change-credentials.component';

describe('AccountChangeCredentialsComponent', () => {
  let component: AccountChangeCredentialsComponent;
  let fixture: ComponentFixture<AccountChangeCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountChangeCredentialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountChangeCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
