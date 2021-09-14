import { Injectable } from '@angular/core';
import { SentryErrorHandler } from '@sentry/angular';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService extends SentryErrorHandler {}
