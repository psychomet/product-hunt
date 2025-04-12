import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHuntFeatureComponent } from './product-hunt-feature.component';

describe('ProductHuntFeatureComponent', () => {
  let component: ProductHuntFeatureComponent;
  let fixture: ComponentFixture<ProductHuntFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHuntFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHuntFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
