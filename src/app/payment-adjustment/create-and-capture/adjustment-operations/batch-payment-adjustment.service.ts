import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeAll, share } from 'rxjs/internal/operators';

import { AdjustmentOperationEvent } from './adjustment-event';
import {
    PaymentAdjustmentCancelParams,
    PaymentAdjustmentCaptureParams,
    PaymentAdjustmentCreationParams,
} from './adjustment-params';
import { CancelAdjustmentService } from './cancel-adjustment.service';
import { CaptureAdjustmentService } from './capture-adjustment.service';
import { CreateAdjustmentService } from './create-adjustment.service';

@Injectable()
export class BatchPaymentAdjustmentService {
    progress$: Observable<number> = of(
        this.createAdjustmentService.progress$,
        this.cancelAdjustmentService.progress$,
        this.captureAdjustmentService.progress$
    ).pipe(mergeAll(), share());

    events$: Observable<AdjustmentOperationEvent> = of(
        this.createAdjustmentService.events$,
        this.cancelAdjustmentService.events$,
        this.captureAdjustmentService.events$
    ).pipe(mergeAll(), share());

    constructor(
        private createAdjustmentService: CreateAdjustmentService,
        private cancelAdjustmentService: CancelAdjustmentService,
        private captureAdjustmentService: CaptureAdjustmentService
    ) {}

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
