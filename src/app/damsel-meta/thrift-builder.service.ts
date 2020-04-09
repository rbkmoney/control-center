import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorObservable, MetaErrorEmitter } from './meta-error-emitter';
import { MetaStruct, MetaUnion } from './model';
import { buildStructUnion, ThriftType } from './thrift-builder';

@Injectable()
export class ThriftBuilderService implements ErrorObservable {
    private errorEmitter: MetaErrorEmitter;

    constructor() {
        this.errorEmitter = new MetaErrorEmitter();
    }

    get errors(): Observable<string> {
        return this.errorEmitter.errors;
    }

    build(meta: MetaStruct | MetaUnion): ThriftType | null {
        try {
            return buildStructUnion(meta);
        } catch (ex) {
            console.error(ex);
            this.errorEmitter.emitErrors([ex.message]);
            return null;
        }
    }
}
