import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setTag } from '@sentry/angular';
import isNil from 'lodash-es/isNil';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SentryHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError((resp) => {
                this.interceptRequest(req);
                return throwError(resp);
            })
        );
    }

    private interceptRequest(req: HttpRequest<unknown>): void {
        const xRequestId = req.headers.get('x-request-id');
        if (!isNil(xRequestId)) {
            setTag('x-request-id', xRequestId);
        }
    }
}
