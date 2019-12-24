import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import connectClient from 'woody_js';

type Exception<N = string, T = {}> = {
    name: N;
    message: string;
} & T;

export class ThriftService {
    protected endpoint: string;
    protected service: any;

    constructor(private zone: NgZone, endpoint: string, thriftService: any) {
        this.endpoint = endpoint;
        this.service = thriftService;
    }

    protected toObservableAction<T extends (...A: any[]) => Observable<any>>(name: string): T {
        return ((...args) =>
            Observable.create(observer => {
                this.zone.run(() => {
                    try {
                        this.createClient(msg => {
                            observer.error(msg);
                            observer.complete();
                        })[name](...args, (ex: Exception, result) => {
                            ex ? observer.error(ex) : observer.next(result);
                            observer.complete();
                        });
                    } catch (e) {
                        observer.error(e);
                        observer.complete();
                    }
                });
            }).pipe(timeout(60000))) as any;
    }

    private createClient(errorCb: Function) {
        return connectClient(
            location.hostname,
            location.port,
            this.endpoint,
            this.service,
            errorCb
        );
    }
}
