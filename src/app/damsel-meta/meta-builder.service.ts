import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DefinitionService } from './definition.service';
import { buildInitialMeta, findMeta, MetaEnricher } from './meta-builder';
import { ErrorObservable, MetaErrorEmitter } from './meta-error-emitter';
import { MetaStruct, MetaUnion } from './model';

@Injectable()
export class MetaBuilder implements ErrorObservable {
    private errorEmitter: MetaErrorEmitter;

    constructor(private definitionService: DefinitionService) {
        this.errorEmitter = new MetaErrorEmitter();
    }

    get errors(): Observable<string> {
        return this.errorEmitter.errors;
    }

    build(type: string, namespace: string): Observable<MetaStruct | MetaUnion | null> {
        return this.definitionService.astDefinition.pipe(
            map((astDef) => {
                const initial = buildInitialMeta(astDef);
                const target = findMeta<MetaStruct | MetaUnion>({ namespace, type }, initial);
                if (!target) {
                    this.errorEmitter.emitErrors(['Target meta not found']);
                }
                const enricher = new MetaEnricher(namespace, initial);
                const { errors, enriched } = enricher.enrich(target);
                if (errors.length > 0) {
                    this.errorEmitter.emitErrors(errors);
                }
                return errors.length === 0 ? enriched : null;
            })
        );
    }
}
