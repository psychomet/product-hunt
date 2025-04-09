import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEmailAddressComponent } from './change-email-address.component';

describe('ChangeEmailAddressComponent', () => {
  let component: ChangeEmailAddressComponent;
  let fixture: ComponentFixture<ChangeEmailAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeEmailAddressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeEmailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
