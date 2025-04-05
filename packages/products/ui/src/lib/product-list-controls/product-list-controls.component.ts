import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FacetWithValues {
  id: string;
  name: string;
  values: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

export interface FacetValue {
  count: number;
  facetValue: {
    id: string;
    name: string;
    facet: {
      id: string;
      name: string;
    };
  };
}

@Component({
  selector: 'lib-product-list-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white">
      <div class="border-b border-gray-200 py-4">
        <h3 class="flow-root -my-3">
          <!-- Expand/collapse section button -->
          <button 
            type="button" 
            class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
            (click)="manuallyExpanded.set(!manuallyExpanded())"
            [attr.aria-expanded]="filtersExpanded()"
          >
            <span class="font-medium text-gray-900">Filters</span>
            <span class="ml-6 flex items-center">
              <svg 
                [class.rotate-180]="filtersExpanded()"
                class="h-5 w-5 transform transition-transform duration-200" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        </h3>
      </div>

      <div *ngIf="filtersExpanded()" class="divide-y divide-gray-200">
        <div *ngFor="let facet of facets(); trackBy: trackById" class="py-6">
          <h3 class="text-sm font-medium text-gray-900">{{ facet.name }}</h3>
          <div class="mt-4 space-y-4">
            <div *ngFor="let value of facet.values; trackBy: trackById" class="flex items-center">
              <input
                type="checkbox"
                [id]="value.id"
                [checked]="isActive(value.id)"
                (change)="ontToggleFacetValue(value.id)"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              >
              <label [for]="value.id" class="ml-3 text-sm text-gray-600">
                {{ value.name }} ({{ value.count }})
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListControlsComponent {
  // Inputs
  readonly activeFacetValueIds = input<string[]>([]);
  readonly facetValues = input<FacetValue[]>([]);
  readonly totalResults = input<number>(0);

  // Events
  readonly toggleFacetValue = model.required<string>();

  // Local state
  readonly manuallyExpanded = signal(false);

  // Computed values
  readonly filtersExpanded = computed(() => 
    this.manuallyExpanded() || this.activeFacetValueIds().length > 0
  );

  readonly facets = computed(() => this.groupFacetValues(this.facetValues()));

  isActive(facetValueId: string): boolean {
    return this.activeFacetValueIds().includes(facetValueId);
  }

  trackById(_: number, item: { id: string }): string {
    return item.id;
  }

  private groupFacetValues(facetValues: FacetValue[]): FacetWithValues[] {
    if (!facetValues?.length) {
      return [];
    }

    const activeFacetValueIds = this.activeFacetValueIds();
    const facetMap = new Map<string, FacetWithValues>();

    for (const { count, facetValue: { id, name, facet } } of facetValues) {
      if (count === this.totalResults() && !activeFacetValueIds.includes(id)) {
        // skip FacetValues that do not have any effect on the
        // result set and are not active
        continue;
      }

      const facetFromMap = facetMap.get(facet.id);
      if (facetFromMap) {
        facetFromMap.values.push({ id, name, count });
      } else {
        facetMap.set(facet.id, {
          id: facet.id,
          name: facet.name,
          values: [{ id, name, count }]
        });
      }
    }

    return Array.from(facetMap.values());
  }

  ontToggleFacetValue(id: string){
    this.toggleFacetValue.update(() => id)
  }
} 