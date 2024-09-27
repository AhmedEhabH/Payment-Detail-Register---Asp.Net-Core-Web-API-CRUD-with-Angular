import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
    providers : [
        provideZoneChangeDetection({eventCoalescing : true}),
        provideRouter(routes), provideHttpClient(), provideAnimations(), provideToastr()
    ]
};
