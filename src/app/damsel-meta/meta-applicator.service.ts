import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MetaErrorEmitter, ErrorObservable } from './meta-error-emitter';
import { MetaStruct, MetaUnion, MetaPayload } from './model';
import { applyValue } from './apply-value';
import { ObjectASTNode, IError } from '../jsonc';
import { parse } from '../jsonc/json-parser';

@Injectable()
export class MetaApplicator implements ErrorObservable {
    private errorEmitter: MetaErrorEmitter;

    constructor() {
        this.errorEmitter = new MetaErrorEmitter();
    }

    get errors(): Observable<string> {
        return this.errorEmitter.errors;
    }

    apply(meta: MetaStruct | MetaUnion, json: string): MetaPayload {
        const invalid = { valid: false };
        if (!meta || !json) {
            this.errorEmitter.emitErrors(['Meta or value is null']);
            return invalid;
        }
        const document = parse(json);
        if (document.errors.length > 0) {
            this.emitMonacoErrors(document.errors);
            return invalid;
        }
        const appliedResult = applyValue(meta, document.root as ObjectASTNode);
        if (appliedResult.errors.length > 0) {
            this.errorEmitter.emitErrors(appliedResult.errors);
            return invalid;
        }
        return {
            valid: true,
            payload: appliedResult.applied
        };
    }

    private emitMonacoErrors(errors: IError[]) {
        this.errorEmitter.emitErrors(errors.map(e => e.message));
    }
}
