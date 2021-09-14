import { ErrorHandler, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerOptions, TraceService } from '@sentry/angular';

import { ErrorHandlerService as CustomErrorHandlerService } from './error-handler.service';

export function createSentryProviders(options?: ErrorHandlerOptions): Provider[] {
    return [
        {
            provide: ErrorHandler,
            useFactory: () => new CustomErrorHandlerService(options),
        },
        { provide: TraceService, deps: [Router] },
    ];
}
