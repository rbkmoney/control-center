import { ValueType, SetType, ListType, MapType } from 'thrift-ts';
import isString from 'lodash-es/isString';

import {
    PrimitiveType,
    MetaPrimitive,
    MetaType,
    CollectionType,
    MetaCollection,
    MetaMap
} from '../model';
import { isPrimitiveType, isComplexType } from './utils';

const resolveCollection = (
    collectionType: CollectionType,
    itemType: ValueType
): MetaCollection => ({
    type: MetaType.collection,
    collectionType,
    itemMeta: itemType as string
});

const resolveMap = (keyType: ValueType, valueType: ValueType): MetaMap => ({
    type: MetaType.map,
    keyMeta: keyType as string,
    valueMeta: valueType as string
});

export const resolvePrimitive = (primitiveType: PrimitiveType): MetaPrimitive => ({
    type: MetaType.primitive,
    primitiveType
});

export function resolveAstValueType(
    type: ValueType
): MetaPrimitive | MetaCollection | MetaMap | string {
    if (isPrimitiveType(type)) {
        return resolvePrimitive(type as PrimitiveType);
    }
    if (isComplexType(type, 'set')) {
        return resolveCollection(CollectionType.set, (type as SetType).valueType);
    }
    if (isComplexType(type, 'list')) {
        return resolveCollection(CollectionType.list, (type as ListType).valueType);
    }
    if (isComplexType(type, 'map')) {
        return resolveMap((type as MapType).keyType, (type as MapType).valueType);
    }
    if (isString(type)) {
        return type;
    }
    throw Error('Unknown ast value type');
}
