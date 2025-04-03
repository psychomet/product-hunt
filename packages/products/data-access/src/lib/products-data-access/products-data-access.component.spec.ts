import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsDataAccessComponent } from './products-data-access.component';

describe('ProductsDataAccessComponent', () => {
  let component: ProductsDataAccessComponent;
  let fixture: ComponentFixture<ProductsDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
