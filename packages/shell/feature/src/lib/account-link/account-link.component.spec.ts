import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLinkComponent } from './account-link.component';

describe('AccountLinkComponent', () => {
  let component: AccountLinkComponent;
  let fixture: ComponentFixture<AccountLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
