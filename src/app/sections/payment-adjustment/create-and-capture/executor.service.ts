import { Injectable } from '@angular/core';
// eslint-disable-next-line you-dont-need-lodash-underscore/flatten
import flatten from 'lodash-es/flatten';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

export enum ExecResultType {
    Success = 'success',
    Error = 'error',
}

export interface ExecResult {
    type: ExecResultType;
    container: ExecContainer;
}

export interface ExecContainer {
    fn: (...args: any[]) => Observable<any>;
    context: any;
    params: any;
}

export interface ExecSuccessResult extends ExecResult {
    data: any;
}

export interface ExecErrorResult extends ExecResult {
    exception: any;
}

@Injectable()
export class ExecutorService {
    progress$: Subject<number> = new Subject();

    exec(containers: ExecContainer[], execCount = 4): Observable<ExecResult[]> {
        const containerQueue = containers.slice();
        this.updateProgress(containers.length, 0);
        const executor = (results: ExecResult[] = []) => {
            const container = containerQueue.pop();
            this.updateProgress(
                containers.length,
                containers.length - containerQueue.length - execCount
            );
            if (container) {
                const { fn, context, params } = container;
                const args = Object.entries(params).map((e) => (e.length > 0 ? e[1] : null));
                return fn.apply(context, args).pipe(
                    catchError((exception) =>
                        of({
                            type: ExecResultType.Error,
                            container,
                            exception,
                        })
                    ),
                    switchMap((nextRes: any) => {
                        if (nextRes && nextRes.type === ExecResultType.Error) {
                            return executor([...results, nextRes]);
                        }
                        return executor([
                            ...results,
                            {
                                type: ExecResultType.Success,
                                container,
                                data: nextRes,
                            } as ExecSuccessResult,
                        ]);
                    })
                );
            }
            return of(results);
        };
        const execs = new Array(execCount).fill([]).map(executor);
        return forkJoin(execs).pipe(map((res) => flatten(res) as ExecResult[]));
    }

    private updateProgress(length: number, value: number) {
        const result = Math.min(Math.max(Math.round((value / length) * 100), 0), 100);
        this.progress$.next(result);
    }
}
