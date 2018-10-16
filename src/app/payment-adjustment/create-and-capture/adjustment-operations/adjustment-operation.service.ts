import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/internal/operators';
import groupBy from 'lodash-es/groupBy';

import { ExecutorService } from '../executor.service';
import { PaymentProcessingTypedManager } from '../../../thrift/payment-processing-typed-manager';
import { AdjustmentOperationEvent } from './adjustment-event';
import { ExecResultGroup } from './exec-result-group';

@Injectable()
export abstract class AdjustmentOperationService {

    events$: Subject<AdjustmentOperationEvent> = new Subject<AdjustmentOperationEvent>();

    progress$: Subject<number>;

    constructor(
        protected executorService: ExecutorService,
        protected manager: PaymentProcessingTypedManager) {
        this.progress$ = this.executorService.progress$;
    }

    batch(params: any[]): Observable<void> {
        return this.executorService.exec(this.toExecParams(params))
            .pipe(
                map((res) => groupBy(res, 'type')),
                tap(this.handleExecResult.bind(this)),
                map(() => null)
            );
    }

    protected abstract toExecParams(params: any[]): any[];

    protected abstract handleExecResult(group: ExecResultGroup): void;
}
