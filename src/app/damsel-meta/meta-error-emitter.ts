import { Observable, Subject } from 'rxjs';

export interface ErrorObservable {
    errors: Observable<string>;
}

export class MetaErrorEmitter {
    private errors$: Subject<string> = new Subject();

    get errors(): Observable<string> {
        return this.errors$;
    }

    emitErrors(errors: string[]) {
        for (const error of errors) {
            this.errors$.next(error);
        }
    }
}
