import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsUtilComponent } from './products-util.component';

describe('ProductsUtilComponent', () => {
  let component: ProductsUtilComponent;
  let fixture: ComponentFixture<ProductsUtilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsUtilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
