import {
    MetaTyped,
    MetaCollection,
    MetaMap,
    MetaType,
    MetaStruct,
    MetaUnion,
    MetaTypeDefined,
    MetaTypedef
} from '../../model';
import { MetaTypeCondition, MetaGroup } from '../model';
import { findMeta } from '../find-meta';
import { resolveCircularMeta } from './resolve-circular-meta';
import { isObjectRefType } from '../utils';

type MetaLoop = string;

export class MetaEnricher {
    private enrichedObjects: (MetaStruct | MetaUnion)[] = [];
    private registredMeta: MetaTypeDefined[] = [];
    private errors: string[] = [];

    constructor(
        private namespace: string,
        private shallowMetaDef: MetaGroup[],
        private loopSign = '$loop_'
    ) {}

    enrich(target: MetaStruct | MetaUnion): MetaStruct | MetaUnion {
        if (!target) {
            return null;
        }
        this.registerMeta(target);
        const enriched = this.enrichStructUnion(target);
        this.pushEnrichedObject(enriched);
        resolveCircularMeta(this.enrichedObjects, this.loopSign);
        return enriched;
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
        this.pushEnrichedObject(result);
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

    private enrichTypedef(meta: MetaTypedef): MetaTypedef {
        const result = this.enrichObjectMeta(meta.meta);
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

    private enrichCollectionMapMeta(meta: MetaTyped | string): MetaTyped | MetaLoop {
        if (isObjectRefType(meta)) {
            return this.enrichObjectRefWithLoopCheck(meta as string);
        }
        return meta;
    }

    private enrichObjectMeta(meta: MetaTyped | string): MetaTyped | MetaLoop {
        if (isObjectRefType(meta)) {
            return this.enrichObjectRefWithLoopCheck(meta as string);
        }
        return this.enrichTyped(meta as MetaTyped);
    }

    private enrichObjectRefWithLoopCheck(meta: string): MetaTyped | MetaLoop {
        if (this.isMetaRegistred(meta)) {
            return `${this.loopSign}${meta}`;
        }
        return this.enrichObjectRef(this.getCondition(meta));
    }

    private enrichObjectRef(condition: MetaTypeCondition): MetaTyped {
        const meta = findMeta<MetaTyped & MetaTypeDefined>(condition, this.shallowMetaDef);
        if (meta === null) {
            this.registerError(
                `Meta not found. Namespace: ${condition.namespace}, type: ${condition.type}`
            );
            return; // TODO test this case
        }
        this.registerMeta(meta);
        return this.enrichTyped(meta);
    }

    private registerError(message: string, prefix = 'Enrichement error'): void {
        const error = `${prefix}. ${message}`;
        console.error(error);
        this.errors = [...this.errors, error];
    }

    private pushEnrichedObject(o: MetaStruct | MetaUnion): void {
        const found = this.enrichedObjects.find(i => i.name === o.name);
        if (!found) {
            this.enrichedObjects = [...this.enrichedObjects, o];
        }
    }

    private registerMeta(meta: MetaTyped & MetaTypeDefined): void {
        switch (meta.type) {
            case MetaType.struct:
            case MetaType.union:
                this.registredMeta = [...this.registredMeta, meta];
        }
    }

    private isMetaRegistred(meta: string): boolean {
        return !!this.registredMeta.find(i => i.name === meta);
    }

    private getCondition(meta: string): MetaTypeCondition {
        const [first, second] = meta.split('.');
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
}
