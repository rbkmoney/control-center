import { MetaTyped, ASTDefinition, MetaStruct, MetaUnion } from './model';
import { parse, ObjectASTNode } from '../jsonc';
import { buildInitialMeta, findMeta } from './meta-builder';
import { MetaEnricher } from './meta-builder/enrichment/meta-enricher';
import { applyValue } from './apply-value';

export function build(
    json: string,
    astDef: ASTDefinition[],
    type: string,
    namespace = 'domain'
): MetaTyped {
    if (!json || !astDef || !type) {
        return;
    }
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
    const document = parse(json);
    if (document.errors.length > 0) {
        return;
    }
    const appliedResult = applyValue(enrichResult.enriched, document.root as ObjectASTNode);
    if (appliedResult.errors.length > 0) {
        return;
    }
    return appliedResult.applied;
}
