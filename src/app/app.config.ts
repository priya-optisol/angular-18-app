import { ApplicationConfig, provideZoneChangeDetection, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment'
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export interface AppConfig {
  apiPrefix: string;
  production: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
  {
    provide: APP_CONFIG,
    useValue: {
      apiPrefix: environment.apiPrefix,
      production: environment.production
    }
  },
   provideToastr(), // Toastr providers
   provideAnimations(), // required animations providers
  ]
};
