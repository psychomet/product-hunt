import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductHuntUiComponent } from './product-hunt-ui.component';

describe('ProductHuntUiComponent', () => {
  let component: ProductHuntUiComponent;
  let fixture: ComponentFixture<ProductHuntUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHuntUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductHuntUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
