import isNil from 'lodash-es/isNil';
import { Observable } from 'rxjs';

import { ThriftServiceConnection, ThriftServiceMethod } from './types';

export const prepareThriftServiceMethod = <T>(
    connection: ThriftServiceConnection,
    serviceMethodName: string
): ThriftServiceMethod<T> => (...args): Observable<T> =>
    new Observable((observer) => {
        const serviceMethod = connection[serviceMethodName];
        if (isNil(serviceMethod)) {
            observer.error(`Service method: "${serviceMethodName}" is not found in thrift client`);
            observer.complete();
        }
        serviceMethod.bind(connection)(...args, (err, result) => {
            if (err) observer.error(err);
            else observer.next(result);
            observer.complete();
        });
    });
