import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { MetaStruct, MetaUnion } from './model';
import { DefinitionService } from './definition.service';
import { buildInitialMeta, findMeta, MetaEnricher } from '.';
import { applyValue } from './apply-value';
import { ObjectASTNode, parse } from '../jsonc';

@Injectable()
export class MetaBuilderService {
    errors$: Subject<any> = new Subject();

    constructor(private definitionService: DefinitionService) {}

    buildMeta(type: string, namespace = 'domain'): Observable<MetaStruct | MetaUnion> {
        return this.definitionService.astDefinition.pipe(
            map(astDef => {
                const initial = buildInitialMeta(astDef);
                const target = findMeta<MetaStruct | MetaUnion>({ namespace, type }, initial);
                if (!target.fields) {
                    return;
                }
                const enricher = new MetaEnricher(namespace, initial);
                const enrichResult = enricher.enrich(target);
                if (enrichResult.errors.length > 0) {
                    return;
                }
                return enrichResult.enriched;
            })
        );
    }

    applyValue(meta: MetaStruct | MetaUnion, json: string): MetaStruct | MetaUnion {
        const document = parse(json);
        if (document.errors.length > 0) {
            return;
        }
        const appliedResult = applyValue(meta, document.root as ObjectASTNode);
        if (appliedResult.errors.length > 0) {
            return;
        }
        return appliedResult.applied;
    }
}
