import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { Exception } from './exception';

@Injectable()
export class ThriftService {
    constructor(private zone: NgZone) {
    }

    toObservableAction<T extends (...A: any[]) => Observable<any>>(func: Function): T {
        return ((...args) => Observable.create((observer) => {
            this.zone.run(() => {
                try {
                    func(...args, (ex: Exception, result) => {
                        ex ? observer.error(ex) : observer.next(result);
                        observer.complete();
                    });
                } catch (e) {
                    observer.error(e);
                    observer.complete();
                }
            });
        }).pipe(timeout(30000))) as any;
    }
}
