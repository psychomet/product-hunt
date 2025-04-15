import { Route } from "@angular/router";

import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductSubmissionComponent } from "./product-submission/product-submission.component";

export const productHuntFeatureRoutes: Route[] = [
    {
        path: 'product-submission',
        component: ProductSubmissionComponent,
    },
    {
        path: ':id',
        component: ProductDetailsComponent,
    },
];