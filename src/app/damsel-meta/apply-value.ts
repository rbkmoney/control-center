import Int64 from 'thrift-ts/lib/int64';

import {
    ArrayASTNode,
    ASTNode,
    BooleanASTNode,
    NumberASTNode,
    ObjectASTNode,
    PropertyASTNode,
    StringASTNode,
} from '../jsonc';
import {
    MetaCollection,
    MetaEnum,
    MetaField,
    MetaMap,
    MetaPrimitive,
    MetaStruct,
    MetaType,
    MetaTyped,
    MetaUnion,
    PrimitiveType,
} from './model';

export interface ApplyPayload {
    applied: MetaStruct | MetaUnion;
    errors: string[];
}

function applyToCollection(meta: MetaCollection, nodeValue: ASTNode): MetaCollection {
    if (nodeValue.type !== 'array') {
        throw new Error(
            `Applied to collection node value should be array type. Current type is ${nodeValue.type}`
        );
    }
    const { items } = nodeValue as ArrayASTNode;
    return {
        ...meta,
        value: items.map((i) => applyToMeta(meta.itemMeta as MetaTyped, i)),
    };
}

function applyToMap(meta: MetaMap, nodeValue: ASTNode): MetaMap {
    if (nodeValue.type !== 'array') {
        throw new Error(
            `Applied to map node value should be array type. Current type is ${nodeValue.type}`
        );
    }
    const { items } = nodeValue as ArrayASTNode;
    const value = new Map();
    for (const nodeItem of items) {
        if (nodeItem.type !== 'object') {
            throw new Error(
                `Applied to map item node value should be object type. Current type is ${nodeItem.type}`
            );
        }
        const keyValueProps = (nodeItem as ObjectASTNode).properties;
        if (keyValueProps.length !== 2) {
            throw new Error(
                `Applied to map object props should has length 2 (key, value). Current length is ${keyValueProps.length}`
            );
        }
        const [keyProp, valueProp] = keyValueProps;
        const mapKey = applyToMeta(meta.keyMeta as MetaTyped, keyProp.value);
        const mapValue = applyToMeta(meta.valueMeta as MetaTyped, valueProp.value);
        value.set(mapKey, mapValue);
    }
    return {
        ...meta,
        value,
    };
}

function applyToEnum(meta: MetaEnum, nodeValue: ASTNode): MetaEnum {
    if (nodeValue.type !== 'number') {
        throw new Error(
            `Applied to enum node value should be number type. Current type is ${nodeValue.type}`
        );
    }
    return {
        ...meta,
        value: (nodeValue as NumberASTNode).value,
    };
}

function applyToNumber({ primitiveType }: MetaPrimitive, { value }: NumberASTNode) {
    switch (primitiveType) {
        case PrimitiveType.i8:
        case PrimitiveType.i16:
        case PrimitiveType.i32:
            return value;
        case PrimitiveType.i64:
            return new Int64(value);
        default:
            throw new Error(`Wrong primitiveType ${primitiveType} and number applied value`);
    }
}

function applyToString({ primitiveType }: MetaPrimitive, { value }: StringASTNode): string {
    if (primitiveType !== PrimitiveType.string) {
        throw new Error(`Wrong primitiveType ${primitiveType} and string applied value`);
    }
    return value;
}

function applyToBoolean({ primitiveType }: MetaPrimitive, nodeValue: BooleanASTNode) {
    if (primitiveType !== PrimitiveType.bool) {
        throw new Error(`Wrong primitiveType ${primitiveType} and boolean applied value`);
    }
    return nodeValue.getValue();
}

function applyToPrimitive(meta: MetaPrimitive, nodeValue: ASTNode): MetaPrimitive {
    if (
        nodeValue.type !== 'number' &&
        nodeValue.type !== 'string' &&
        nodeValue.type !== 'boolean' &&
        nodeValue.type !== 'null'
    ) {
        throw new Error(
            `Applied to primitive node value should be number, string, boolean or null type. Current type is ${nodeValue.type}`
        );
    }
    let value;
    switch (nodeValue.type) {
        case 'number':
            value = applyToNumber(meta, nodeValue as NumberASTNode);
            break;
        case 'string':
            value = applyToString(meta, nodeValue as StringASTNode);
            break;
        case 'boolean':
            value = applyToBoolean(meta, nodeValue as BooleanASTNode);
            break;
        case 'null':
            value = null;
            break;
    }
    return {
        ...meta,
        value,
    };
}

function applyToMeta(meta: MetaTyped, value: ASTNode): MetaTyped {
    switch (meta.type) {
        case MetaType.struct:
            return applyToStruct(meta as MetaStruct, value);
        case MetaType.union:
            return applyToUnion(meta as MetaUnion, value);
        case MetaType.collection:
            return applyToCollection(meta as MetaCollection, value);
        case MetaType.map:
            return applyToMap(meta as MetaMap, value);
        case MetaType.enum:
            return applyToEnum(meta as MetaEnum, value);
        case MetaType.primitive:
            return applyToPrimitive(meta as MetaPrimitive, value);
    }
    throw new Error(`Unsupported meta type ${meta.type}`);
}

function applyToField(field: MetaField, properties: PropertyASTNode[]): MetaField {
    const found = properties.find(({ value: { location } }) => location === field.name);
    return found
        ? {
              ...field,
              meta: applyToMeta(field.meta as MetaTyped, found.value),
          }
        : field;
}

function applyToFields(fields: MetaField[], values: PropertyASTNode[]): MetaField[] {
    return fields.map((f) => applyToField(f, values));
}

function applyToUnion(subject: MetaUnion, value: ASTNode): MetaUnion {
    if (value.type !== 'object') {
        throw new Error(
            `Applied to union node value should be object type. Current type is ${value.type}`
        );
    }
    const properties = (value as ObjectASTNode).properties;
    if (properties.length !== 1) {
        throw new Error(
            `Applied to union node properties length should be 1. Current properties length is ${properties.length}`
        );
    }
    return {
        ...subject,
        settedField: properties[0].location as string,
        fields: applyToFields(subject.fields, properties),
        virgin: false,
    };
}

function applyToStruct(subject: MetaStruct, value: ASTNode): MetaStruct {
    if (value.type !== 'object') {
        throw new Error(
            `Applied to struct node value should be object type. Current type is ${value.type}`
        );
    }
    return {
        ...subject,
        fields: applyToFields(subject.fields, (value as ObjectASTNode).properties),
        virgin: false,
    };
}

export function applyValue(subject: MetaStruct | MetaUnion, value: ObjectASTNode): ApplyPayload {
    const result = { applied: null, errors: [] };
    try {
        if (value.type !== 'object') {
            throw new Error('Apply value must be ObjectASTNode');
        }
        let applied;
        switch (subject.type) {
            case MetaType.struct:
                applied = applyToStruct(subject as MetaStruct, value);
                break;
            case MetaType.union:
                applied = applyToUnion(subject as MetaUnion, value);
                break;
            default:
                throw new Error(
                    `Applied meta type should be struct or union. Current meta type is ${subject.type}`
                );
        }
        return { ...result, applied };
    } catch (ex) {
        console.error(ex);
        return { ...result, errors: [ex.message] };
    }
}
