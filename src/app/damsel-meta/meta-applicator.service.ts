import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IError, ObjectASTNode } from '../jsonc';
import { parse } from '../jsonc/json-parser';
import { applyValue } from './apply-value';
import { ErrorObservable, MetaErrorEmitter } from './meta-error-emitter';
import { MetaStruct, MetaUnion } from './model';

@Injectable()
export class MetaApplicator implements ErrorObservable {
    private errorEmitter: MetaErrorEmitter;

    constructor() {
        this.errorEmitter = new MetaErrorEmitter();
    }

    get errors(): Observable<string> {
        return this.errorEmitter.errors;
    }

    apply(meta: MetaStruct | MetaUnion, json: string): MetaStruct | MetaUnion | null {
        if (!meta || !json) {
            this.errorEmitter.emitErrors(['Meta or value is null']);
            return null;
        }
        const document = parse(json);
        if (document.errors.length > 0) {
            this.emitMonacoErrors(document.errors);
            return null;
        }
        const appliedResult = applyValue(meta, document.root as ObjectASTNode);
        if (appliedResult.errors.length > 0) {
            this.errorEmitter.emitErrors(appliedResult.errors);
            return null;
        }
        return appliedResult.applied;
    }

    private emitMonacoErrors(errors: IError[]) {
        this.errorEmitter.emitErrors(errors.map((e) => e.message));
    }
}
