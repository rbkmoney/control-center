import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MetaStruct, MetaUnion, MetaPayload } from './model';
import { DefinitionService } from './definition.service';
import { buildInitialMeta, findMeta, MetaEnricher } from '.';
import { MetaErrorEmitter, ErrorObservable } from './meta-error-emitter';

@Injectable()
export class MetaBuilder implements ErrorObservable {
    private errorEmitter: MetaErrorEmitter;

    constructor(private definitionService: DefinitionService) {
        this.errorEmitter = new MetaErrorEmitter();
    }

    get errors(): Observable<string> {
        return this.errorEmitter.errors;
    }

    build(type: string, namespace = 'domain'): Observable<MetaPayload> {
        return this.definitionService.astDefinition.pipe(
            map(astDef => {
                const initial = buildInitialMeta(astDef);
                const target = findMeta<MetaStruct | MetaUnion>({ namespace, type }, initial);
                const enricher = new MetaEnricher(namespace, initial);
                const { errors, enriched } = enricher.enrich(target);
                if (errors.length > 0) {
                    this.errorEmitter.emitErrors(errors);
                }
                return {
                    valid: errors.length === 0,
                    payload: enriched
                };
            })
        );
    }
}
