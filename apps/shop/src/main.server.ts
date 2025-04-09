import { bootstrapApplication } from '@angular/platform-browser';

import { config } from '@bigi-shop/shell-feature';

import { AppComponent } from './app/app.component';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
