import { NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import connectClient from 'woody_js/dist/connect-client';

type Exception<N = string, T = {}> = {
    name: N;
    message: string;
} & T;

export class ThriftService {

    protected client: any;

    constructor(private zone: NgZone, endpoint: string, thriftService: any) {
        this.client = this.createThriftClient(endpoint, thriftService);
    }

    protected toObservableAction<T extends (...A: any[]) => Observable<any>>(func: Function): T {
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
        }).pipe(timeout(5000))) as any;
    }

    private createThriftClient(endpoint: string, thriftService: any) {
        const {hostname, port} = location;
        return connectClient(hostname, port, endpoint, thriftService);
    }
}
