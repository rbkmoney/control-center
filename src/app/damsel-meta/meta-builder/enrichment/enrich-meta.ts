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
type ObjectRef = string;

export class MetaEnricher {
    private objectRefs: MetaTypeDefined[] = [];
    private enrichedObjects: (MetaStruct | MetaUnion)[] = [];
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
        this.registerObjectRef(target);
        const enriched = this.enrichStructUnion(target);
        this.addEnriched(enriched);
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
        this.addEnriched(result);
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
            return `${this.loopSign}${meta}`;
        }
        return this.enrichObjectRef(this.getCondition(meta));
    }

    private enrichObjectRef(condition: MetaTypeCondition): MetaTyped {
        const found = findMeta<MetaTyped & MetaTypeDefined>(condition, this.shallowMetaDef);
        const conditionState = `Namespace: ${condition.namespace}, type: ${condition.type}`;
        if (found === null) {
            this.registerError(`Meta not found. ${conditionState}`);
            return; // TODO test this case
        }
        if (!found.type) {
            this.registerError(`Meta should be typed. ${conditionState}`);
        }
        if (!found.name) {
            this.registerError(`Meta should be type defined. ${conditionState}`);
        }
        this.registerObjectRef(found);
        return this.enrichTyped(found);
    }

    private registerError(message: string, prefix = 'Enrichement error'): void {
        const error = `${prefix}. ${message}`;
        console.error(error);
        this.errors = [...this.errors, error];
    }

    private addEnriched(o: MetaStruct | MetaUnion): void {
        const found = this.enrichedObjects.find(i => i.name === o.name); // TODO Use _.uniqWith
        if (!found) {
            this.enrichedObjects = [...this.enrichedObjects, o];
        }
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
