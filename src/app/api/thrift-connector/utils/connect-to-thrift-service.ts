import { Observable } from 'rxjs';
import connectClient from 'woody_js';
import { ConnectOptions } from 'woody_js/src/connect-options';

import { ThriftService, ThriftServiceConnection } from './types';

export const connectToThriftService = (
    endpoint: string,
    service: ThriftService,
    connectionOptions: ConnectOptions,
    hostname: string = location.hostname,
    port: string = location.port
): Observable<ThriftServiceConnection> =>
    new Observable((observer) => {
        const connection = connectClient(
            hostname,
            port,
            endpoint,
            service,
            connectionOptions,
            (err) => {
                observer.error(err);
                observer.complete();
            }
        );
        observer.next(connection);
        observer.complete();
    });
