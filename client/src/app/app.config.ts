import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducers } from './ngrx/reducers';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideStore(reducers),
    provideAnimations(),
    provideHttpClient(
      // withInterceptors([requestInterceptor])
    ),
    provideToastr(),
  ]
};
