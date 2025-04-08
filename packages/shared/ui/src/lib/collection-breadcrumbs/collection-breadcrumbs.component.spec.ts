import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionBreadcrumbsComponent } from './collection-breadcrumbs.component';

describe('CollectionBreadcrumbsComponent', () => {
  let component: CollectionBreadcrumbsComponent;
  let fixture: ComponentFixture<CollectionBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionBreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
