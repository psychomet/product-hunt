import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUtilTypesComponent } from './shared-util-types.component';

describe('SharedUtilTypesComponent', () => {
  let component: SharedUtilTypesComponent;
  let fixture: ComponentFixture<SharedUtilTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUtilTypesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUtilTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
