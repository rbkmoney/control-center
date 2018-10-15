import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import flatten from 'lodash-es/flatten';

export enum ExecResultType {
    success = 'success',
    error = 'error'
}

export interface ExecResult {
    type: ExecResultType;
    container: ExecContainer;
}

export interface ExecSuccessResult extends ExecResult {
    data: any;
}

export interface ExecErrorResult extends ExecResult {
    exception: any;
}

export interface ExecContainer {
    name: string;
    fn: (...args: any[]) => Observable<any>;
    context: any;
    args: any[];
}

@Injectable()
export class ExecutorService {

    progress$: Subject<number> = new Subject();

    exec(containers: ExecContainer[], execCount = 4): Observable<ExecResult[]> {
        const queue = containers.slice();
        this.updateProgress(containers.length, 0);
        const executor = (results: ExecResult[] = []) => {
            const execContainer = queue.pop();
            this.updateProgress(containers.length, containers.length - queue.length - execCount);
            if (execContainer) {
                const {fn, context, args} = execContainer;
                return fn.apply(context, args).pipe(
                    catchError((ex) => of({
                        type: ExecResultType.error,
                        container: execContainer,
                        exception: ex
                    })),
                    switchMap((nextRes: any) => {
                        if (nextRes && nextRes.type === ExecResultType.error) {
                            return executor([...results, nextRes]);
                        }
                        return executor([...results, {
                            type: ExecResultType.success,
                            container: execContainer,
                            data: nextRes
                        } as ExecSuccessResult]);
                    })
                );
            }
            return of(results);
        };
        const execs = new Array(execCount).fill([]).map(executor);
        return forkJoin(execs).pipe(map((res) => flatten(res)));
    }

    private updateProgress(length: number, value: number) {
        const result = Math.min(Math.max(Math.round(value / length * 100), 0), 100);
        this.progress$.next(result);
    }
}
