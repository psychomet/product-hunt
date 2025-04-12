import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from '@product-hunt/shell-feature';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
