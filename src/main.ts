import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

export declare let googletag: { pubads: () => any; destroySlots: (slots: any) => void };

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
