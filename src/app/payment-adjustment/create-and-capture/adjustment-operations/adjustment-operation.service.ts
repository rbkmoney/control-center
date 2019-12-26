import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/internal/operators';
import groupBy from 'lodash-es/groupBy';

import { ExecutorService } from '../executor.service';
import { PaymentProcessingService } from '../../../thrift-services/damsel/payment-processing.service';
import { AdjustmentOperationEvent, EventType } from './adjustment-event';
import { ExecResultGroup } from './exec-result-group';

@Injectable()
export abstract class AdjustmentOperationService {
    events$: Subject<AdjustmentOperationEvent> = new Subject<AdjustmentOperationEvent>();

    progress$: Subject<number>;

    constructor(
        protected executorService: ExecutorService,
        protected manager: PaymentProcessingService
    ) {
        this.progress$ = this.executorService.progress$;
    }

    batch(params: any[]): Observable<void> {
        const execParams = this.toExecParams(params);
        this.events$.next({ type: EventType.BatchOperationStarted });
        return this.executorService.exec(execParams).pipe(
            map(res => groupBy(res, 'type')),
            tap(this.handleExecResult.bind(this)),
            tap(() => this.events$.next({ type: EventType.BatchOperationFinished })),
            map(() => null),
            catchError(err => {
                this.events$.next({ type: EventType.BatchOperationFailed });
                return throwError(err);
            })
        );
    }

    protected abstract toExecParams(params: any[]): any[];

    protected abstract handleExecResult(group: ExecResultGroup): void;
}
