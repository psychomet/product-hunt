import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountUiComponent } from './account-ui.component';

describe('AccountUiComponent', () => {
  let component: AccountUiComponent;
  let fixture: ComponentFixture<AccountUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
