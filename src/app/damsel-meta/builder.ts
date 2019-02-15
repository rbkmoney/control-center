import { MetaTyped, ASTDefinition, MetaStruct, MetaUnion } from './model';
import { parse, JSONDocument } from '../jsonc';
import { buildInitialMeta, enrichMeta, findMeta } from './meta-builder';

function applyValue(subject: any, value: JSONDocument): MetaTyped {
    return subject;
}

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
    const enriched = enrichMeta(target, namespace, initial);
    const document = parse(json);
    if (document.errors.length > 0) {
        return;
    }
    return applyValue(enriched, document);
}
