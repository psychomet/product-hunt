import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from '@bigi-shop/shell/feature';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
