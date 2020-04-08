import isString from 'lodash-es/isString';
import { ListType, MapType, SetType, ValueType } from 'thrift-ts';

import {
    CollectionType,
    MetaCollection,
    MetaMap,
    MetaPrimitive,
    MetaType,
    PrimitiveType,
} from '../model';
import { isComplexType, isPrimitiveType } from './utils';

const resolveCollection = (
    collectionType: CollectionType,
    itemType: ValueType
): MetaCollection => ({
    type: MetaType.collection,
    collectionType,
    itemMeta: resolveAstValueType(itemType),
});

const resolveMap = (keyType: ValueType, valueType: ValueType): MetaMap => ({
    type: MetaType.map,
    keyMeta: resolveAstValueType(keyType),
    valueMeta: resolveAstValueType(valueType),
});

export const resolvePrimitive = (primitiveType: PrimitiveType): MetaPrimitive => ({
    type: MetaType.primitive,
    primitiveType,
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
