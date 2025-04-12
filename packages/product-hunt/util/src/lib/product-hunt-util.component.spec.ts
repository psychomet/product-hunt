import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHuntUtilComponent } from './product-hunt-util.component';

describe('ProductHuntUtilComponent', () => {
  let component: ProductHuntUtilComponent;
  let fixture: ComponentFixture<ProductHuntUtilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHuntUtilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHuntUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
