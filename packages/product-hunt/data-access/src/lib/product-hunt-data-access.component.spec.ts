import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHuntDataAccessComponent } from './product-hunt-data-access.component';

describe('ProductHuntDataAccessComponent', () => {
  let component: ProductHuntDataAccessComponent;
  let fixture: ComponentFixture<ProductHuntDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHuntDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHuntDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
