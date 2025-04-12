import { bootstrapApplication } from '@angular/platform-browser';

import { config } from '@product-hunt/shell-feature';

import { AppComponent } from './app/app.component';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
