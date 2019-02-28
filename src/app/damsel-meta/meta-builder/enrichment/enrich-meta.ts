import isString from 'lodash-es/isString';

import {
    MetaTyped,
    MetaCollection,
    MetaMap,
    MetaTypedef,
    MetaType,
    MetaField,
    MetaStruct,
    MetaUnion,
    MetaTypeDefined
} from '../../model';
import { MetaTypeCondition, MetaGroup } from '../model';
import { findMeta } from '../find-meta';
import { isPrimitiveType } from '../utils';
import { resolveCircularMeta } from './resolve-circular-meta';

const isMetaRegistred = (meta: string, usedMeta: MetaTypeDefined[]) =>
    !!usedMeta.find(i => i.name === meta);

const isObjectRefType = (meta: any) => isString(meta) && !isPrimitiveType(meta);

function getCondition(meta: string, defaultNamespace: string): MetaTypeCondition {
    const [first, second] = meta.split('.');
    return second
        ? {
              namespace: first,
              type: second
          }
        : {
              namespace: defaultNamespace,
              type: first
          };
}

export class MetaEnricher {
    private сircularSign = '$circular_';
    private enrichedObjects: (MetaStruct | MetaUnion)[] = [];
    private registredMeta: MetaTypeDefined[] = [];
    private errors: string[] = [];

    constructor(private namespace: string, private shallowMetaDef: MetaGroup[]) {}

    enrich(target: MetaStruct | MetaUnion): MetaStruct | MetaUnion {
        if (!target) {
            return null;
        }
        this.registerMeta(target);
        const enriched = this.enrichObject(target);
        this.pushEnrichedObject(enriched);
        resolveCircularMeta(this.enrichedObjects, this.сircularSign);
        return enriched;
    }

    private enrichObject(meta: MetaStruct | MetaUnion): MetaStruct | MetaUnion {
        const result = {
            ...meta,
            fields: this.enrichFields(meta.fields)
        };
        this.pushEnrichedObject(result);
        return result;
    }

    private enrichFields(fields: MetaField[]): MetaField[] {
        return fields.map(f => this.enrichField(f));
    }

    private enrichField(field: MetaField): MetaField {
        return {
            ...field,
            meta: this.enrichUndetermined(field.meta)
        };
    }

    private enrichUndetermined(meta: MetaTyped | string): MetaTyped | string {
        if (isObjectRefType(meta)) {
            return this.enrichObjectRefWithLoopProtection(meta as string);
        }
        return this.enrichTyped(meta as MetaTyped);
    }

    private enrichObjectRefWithLoopProtection(metaType: string): MetaTyped | string {
        if (isMetaRegistred(metaType, this.registredMeta)) {
            return `${this.сircularSign}${metaType}`;
        }
        return this.enrichObjectRef(getCondition(metaType, this.namespace));
    }

    private enrichObjectRef(condition: MetaTypeCondition): MetaTyped | string {
        const meta = findMeta<MetaTyped>(condition, this.shallowMetaDef);
        if (meta === null) {
            this.registerError(
                `Meta not found. Condition namespace: ${condition.namespace}; type: ${
                    condition.type
                }`
            );
            return; // TODO test this case
        }
        this.registerMeta(meta);
        return this.enrichTyped(meta);
    }

    private enrichTyped(meta: MetaTyped): MetaTyped {
        switch (meta.type) {
            case MetaType.struct:
            case MetaType.union:
                return this.enrichObject(meta as MetaStruct | MetaUnion);
            case MetaType.collection:
                return this.enrichCollection(meta as MetaCollection);
            case MetaType.map:
                return this.enrichMap(meta as MetaMap);
            case MetaType.typedef:
                return this.enrichUndetermined((meta as MetaTypedef).meta) as MetaTyped;
            case MetaType.primitive:
            case MetaType.enum:
                return meta;
        }
        this.registerError(`Enrichement error. Unexpected MetaType: ${meta.type}`);
    }

    private enrichCollection(meta: MetaCollection): MetaCollection {
        let itemMeta = meta.itemMeta;
        if (isObjectRefType(itemMeta)) {
            itemMeta = this.enrichObjectRefWithLoopProtection(itemMeta as string);
        }
        return {
            ...meta,
            itemMeta
        };
    }

    private enrichMap(meta: MetaMap): MetaMap {
        let keyMeta = meta.keyMeta;
        if (isObjectRefType(keyMeta)) {
            keyMeta = this.enrichObjectRefWithLoopProtection(keyMeta as string);
        }
        let valueMeta = meta.valueMeta;
        if (isObjectRefType(valueMeta)) {
            valueMeta = this.enrichObjectRefWithLoopProtection(valueMeta as string);
        }
        return {
            ...meta,
            keyMeta,
            valueMeta
        };
    }

    private registerError(error: string) {
        console.error(error);
        this.errors = [...this.errors, error];
    }

    private pushEnrichedObject(o: MetaStruct | MetaUnion) {
        const found = this.enrichedObjects.find(i => i.name === o.name);
        if (!found) {
            this.enrichedObjects.push(o); // TODO use spread
        }
    }

    private registerMeta(meta: MetaTyped) {
        switch (meta.type) {
            case MetaType.struct:
            case MetaType.union:
                this.registredMeta.push(meta as any); // TODO use spread and fix any
        }
    }
}
