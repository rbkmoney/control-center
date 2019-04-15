import {
    MetaTyped,
    MetaCollection,
    MetaMap,
    MetaType,
    MetaStruct,
    MetaUnion,
    MetaTypeDefined,
    MetaTypedef,
    PrimitiveType
} from '../../model';
import { MetaTypeCondition, MetaGroup } from '../model';
import { findMeta } from '../find-meta';
import { MetaLoopResolver } from './meta-loop-resolver';
import { isObjectRefType, registerError, isPrimitiveType } from '../utils';
import { resolvePrimitive } from '../resolve-ast-value-type';

type MetaLoop = string;
type ObjectRef = string;

export interface EnrichResult {
    enriched: MetaStruct | MetaUnion;
    errors: string[];
}

export class MetaEnricher {
    private objectRefs: MetaTypeDefined[] = [];
    private enrichedObjects: (MetaStruct | MetaUnion)[] = [];
    private errors: string[] = [];
    private hasLoop = false;
    private externalNamespaces: string[] = [];

    constructor(
        private namespace: string,
        private shallowMetaDef: MetaGroup[],
        private loopSign = '$loop_'
    ) {}

    enrich(target: MetaStruct | MetaUnion): EnrichResult {
        if (!target) {
            return null;
        }
        this.registerObjectRef(target);
        const enriched = this.enrichStructUnion(target);
        return this.preserveLoop(enriched);
    }

    private preserveLoop(enriched: MetaStruct | MetaUnion): EnrichResult {
        if (this.hasLoop) {
            const resolver = new MetaLoopResolver(this.enrichedObjects, this.loopSign);
            const { resolved, errors } = resolver.resolve(enriched);
            return {
                enriched: resolved,
                errors: [...this.errors, ...errors]
            };
        }
        return { enriched, errors: this.errors };
    }

    private enrichStructUnion(meta: MetaStruct | MetaUnion): MetaStruct | MetaUnion {
        const fields = meta.fields.map(f => ({
            ...f,
            meta: this.enrichObjectMeta(f.meta)
        }));
        const result = {
            ...meta,
            fields
        };
        this.enrichedObjects = [...this.enrichedObjects, result];
        return result;
    }

    private enrichTyped(meta: MetaTyped): MetaTyped {
        switch (meta.type) {
            case MetaType.struct:
            case MetaType.union:
                return this.enrichStructUnion(meta as MetaStruct | MetaUnion);
            case MetaType.typedef:
                return this.enrichTypedef(meta as MetaTypedef);
            case MetaType.collection:
                return this.enrichCollection(meta as MetaCollection);
            case MetaType.map:
                return this.enrichMap(meta as MetaMap);
            case MetaType.primitive:
            case MetaType.enum:
                return meta;
        }
        this.registerError(`Unsupported enrichment MetaType: ${meta.type}`);
    }

    private enrichTypedef({ meta }: MetaTypedef): MetaTypedef {
        const result = this.enrichObjectMeta(meta);
        if (result === this.loopSign) {
            this.registerError(`Typedef enrichment should not be looped`);
        }
        return result as MetaTypedef;
    }

    private enrichCollection(meta: MetaCollection): MetaCollection {
        return {
            ...meta,
            itemMeta: this.enrichCollectionMapMeta(meta.itemMeta)
        };
    }

    private enrichMap(meta: MetaMap): MetaMap {
        return {
            ...meta,
            keyMeta: this.enrichCollectionMapMeta(meta.keyMeta),
            valueMeta: this.enrichCollectionMapMeta(meta.valueMeta)
        };
    }

    private enrichCollectionMapMeta(meta: MetaTyped | ObjectRef): MetaTyped | MetaLoop {
        if (isObjectRefType(meta)) {
            return this.enrichObjectRefWithLoopCheck(meta as ObjectRef);
        }
        if (isPrimitiveType(meta)) {
            return resolvePrimitive(meta as PrimitiveType);
        }
        return meta;
    }

    private enrichObjectMeta(meta: MetaTyped | ObjectRef): MetaTyped | MetaLoop {
        if (isObjectRefType(meta)) {
            return this.enrichObjectRefWithLoopCheck(meta as ObjectRef);
        }
        return this.enrichTyped(meta as MetaTyped);
    }

    private enrichObjectRefWithLoopCheck(meta: ObjectRef): MetaTyped | MetaLoop {
        if (this.isObjectRefUsed(meta)) {
            this.hasLoop = true;
            return `${this.loopSign}${meta}`;
        }
        return this.enrichObjectRef(this.getCondition(meta));
    }

    private enrichObjectRef(condition: MetaTypeCondition): MetaTyped | ObjectRef {
        const found = this.findMeta(condition);
        const conditionState = `${condition.namespace}.${condition.type}`;
        if (found === null) {
            this.registerError(`Meta not found: ${conditionState}. Bump Control Center damsel!`);
            return condition.type;
        }
        if (!found.type) {
            this.registerError(`Meta should be typed: ${conditionState}`);
            return condition.type;
        }
        if (!found.name) {
            this.registerError(`Meta should be type defined: ${conditionState}`);
            return condition.type;
        }
        this.registerObjectRef(found);
        return this.enrichTyped(found);
    }

    private findMeta(condition: MetaTypeCondition): MetaTyped & MetaTypeDefined | null {
        let found = findMeta<MetaTyped & MetaTypeDefined>(condition, this.shallowMetaDef);
        if (found) {
            return found;
        }
        for (const usedNamespace of this.externalNamespaces) {
            found = findMeta<MetaTyped & MetaTypeDefined>(
                { ...condition, namespace: usedNamespace },
                this.shallowMetaDef
            );
            if (found) {
                break;
            }
        }
        return found;
    }

    private registerError(message: string, prefix = 'Enrichment error'): void {
        this.errors = registerError(this.errors, message, prefix);
    }

    private registerObjectRef(meta: MetaTyped & MetaTypeDefined): void {
        switch (meta.type) {
            case MetaType.struct:
            case MetaType.union:
                this.objectRefs = [...this.objectRefs, meta];
        }
    }

    private isObjectRefUsed(meta: ObjectRef): boolean {
        return !!this.objectRefs.find(({ name }) => name === meta);
    }

    private getCondition(meta: ObjectRef): MetaTypeCondition {
        const [first, second] = meta.split('.');
        if (second) {
            this.registerExternalNamespace(first);
        }
        return second
            ? {
                  namespace: first,
                  type: second
              }
            : {
                  namespace: this.namespace,
                  type: first
              };
    }

    private registerExternalNamespace(namespace: string): void {
        const found = this.externalNamespaces.find(n => n === namespace);
        if (!found) {
            this.externalNamespaces = this.externalNamespaces.concat(namespace);
        }
    }
}
