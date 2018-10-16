import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { mergeAll } from 'rxjs/internal/operators';

import { CaptureAdjustmentService } from './capture-adjustment.service';
import { CancelAdjustmentService } from './cancel-adjustment.service';
import { CreateAdjustmentService } from './create-adjustment.service';
import { AdjustmentOperationEvent } from './adjustment-event';
import {
    PaymentAdjustmentCancelParams,
    PaymentAdjustmentCaptureParams,
    PaymentAdjustmentCreationParams
} from './adjustment-params';

@Injectable()
export class BatchPaymentAdjustmentService {

    progress$: Subject<number> = new Subject<number>();

    events$: Subject<AdjustmentOperationEvent> = new Subject<AdjustmentOperationEvent>();

    constructor(
        private createAdjustmentService: CreateAdjustmentService,
        private cancelAdjustmentService: CancelAdjustmentService,
        private captureAdjustmentService: CaptureAdjustmentService
    ) {
        of(this.createAdjustmentService.events$, this.cancelAdjustmentService.events$, this.captureAdjustmentService.events$)
            .pipe(mergeAll<AdjustmentOperationEvent>())
            .subscribe((event) => {
                this.events$.next(event);
            });
        of(this.createAdjustmentService.progress$, this.cancelAdjustmentService.progress$, this.captureAdjustmentService.progress$)
            .pipe(mergeAll())
            .subscribe((event) => {
                this.progress$.next(event);
            });

    }

    create(params: PaymentAdjustmentCreationParams[]): Observable<void> {
        return this.createAdjustmentService.batch(params);
    }

    cancel(params: PaymentAdjustmentCancelParams[]): Observable<void> {
        return this.cancelAdjustmentService.batch(params);
    }

    capture(params: PaymentAdjustmentCaptureParams[]): Observable<void> {
        return this.captureAdjustmentService.batch(params);
    }
}
