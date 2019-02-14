import {
    JsonAST,
    Enums,
    Structs,
    Field,
    ValueType,
    Unions,
    TypeDefs,
    SetType,
    ListType,
    MapType
} from 'thrift-ts';
import isString from 'lodash-es/isString';
import isObject from 'lodash-es/isObject';

import {
    MetaTyped,
    ASTDefinition,
    MetaType,
    MetaEnum,
    MetaStruct,
    MetaField,
    MetaUnion,
    MetaTypedef,
    PrimitiveType,
    CollectionType,
    MetaPrimitive,
    MetaCollection,
    MetaMap,
    MetaTypeDefined,
    MetaObject
} from './model';
import { parse, JSONDocument } from '../jsonc';

interface MetaGroup {
    namespace: string;
    meta: MetaTypeDefined[];
}

interface MetaTypeCondition {
    type: string;
    namespace: string;
}

const enumsToMetaEnums = (enums: Enums): MetaEnum[] =>
    Object.keys(enums).map(name => ({
        type: MetaType.enum,
        name,
        items: enums[name].items
    }));

const valueTypePrimitiveToMeta = (primitiveType: PrimitiveType): MetaPrimitive => ({
    type: MetaType.primitive,
    primitiveType
});

const valueTypeCollectionToMeta = (
    collectionType: CollectionType,
    itemType: ValueType
): MetaCollection => ({
    type: MetaType.collection,
    collectionType,
    itemMeta: itemType as string
});

const valueTypeMapToMeta = (keyType: ValueType, valueType: ValueType): MetaMap => ({
    type: MetaType.map,
    keyMeta: keyType as string,
    valueMeta: valueType as string
});

const isPrimitiveType = (type: ValueType): boolean =>
    isString(type) &&
    ['int', 'bool', 'i8', 'i16', 'i32', 'i64', 'string', 'double', 'binary'].includes(type);

const isComplexType = (type: ValueType, typeName: 'map' | 'list' | 'set'): boolean => {
    if (!isObject(type)) {
        return false;
    }
    const { name } = type as SetType | ListType | MapType;
    return name === typeName;
};

function valueTypeToMeta(type: ValueType): MetaTyped | MetaObject | MetaTypeDefined | string {
    if (isPrimitiveType(type)) {
        return valueTypePrimitiveToMeta(type as PrimitiveType);
    }
    if (isComplexType(type, 'set')) {
        return valueTypeCollectionToMeta(CollectionType.set, (type as SetType).valueType);
    }
    if (isComplexType(type, 'list')) {
        return valueTypeCollectionToMeta(CollectionType.list, (type as ListType).valueType);
    }
    if (isComplexType(type, 'map')) {
        return valueTypeMapToMeta((type as MapType).keyType, (type as MapType).valueType);
    }
    if (isString(type)) {
        return type;
    }
    return null;
}

const fieldToMetaField = ({ option, name, type }: Field): MetaField => ({
    required: option ? option === 'required' : false,
    name,
    meta: valueTypeToMeta(type)
});

const fieldsToMetaFields = (fields: Field[]): MetaField[] => fields.map(f => fieldToMetaField(f));

const isRef = (name: string): boolean => name.endsWith('Ref');

const structsToMetaStructs = (structs: Structs): MetaStruct[] =>
    Object.keys(structs).map(name => ({
        type: MetaType.struct,
        name,
        fields: fieldsToMetaFields(structs[name]),
        isRef: isRef(name)
    }));

const unionToMetaUnion = (unions: Unions): MetaUnion[] =>
    Object.keys(unions).map(name => ({
        type: MetaType.union,
        name,
        fields: fieldsToMetaFields(unions[name]),
        settedField: null
    }));

const typedefToMeta = (typedefs: TypeDefs): MetaTypedef[] =>
    Object.keys(typedefs).map(name => ({
        type: MetaType.typedef,
        name,
        meta: valueTypeToMeta(typedefs[name].type)
    }));

function astToMeta(ast: JsonAST): MetaTyped[] {
    let r = [];
    if (ast.enum) {
        r = [...r, ...enumsToMetaEnums(ast.enum)];
    }
    if (ast.struct) {
        r = [...r, ...structsToMetaStructs(ast.struct)];
    }
    if (ast.union) {
        r = [...r, ...unionToMetaUnion(ast.union)];
    }
    if (ast.typedef) {
        r = [...r, ...typedefToMeta(ast.typedef)];
    }
    return r;
}

function buildInitialMeta(astDef: ASTDefinition[]): MetaGroup[] {
    if (!astDef || astDef.length === 0) {
        return;
    }
    return astDef.reduce(
        (r, { name, ast }) => [
            ...r,
            {
                namespace: name,
                meta: astToMeta(ast)
            }
        ],
        []
    );
}

function findMeta<T extends MetaTypeDefined | MetaTyped | MetaObject>(
    condition: MetaTypeCondition,
    group: MetaGroup[]
): T {
    if (!condition || !group) {
        return null;
    }
    const byNamespace = group.find(({ namespace }) => namespace === condition.namespace);
    if (!byNamespace) {
        return null;
    }
    return byNamespace.meta.find(({ name }) => name === condition.type) as T;
}

const isNeedEnrichment = (meta: any) => isString(meta); // TODO need do check primitives

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

const enrichMetaObjectField = (
    meta: MetaTyped & MetaObject,
    namespace: string,
    source: MetaGroup[]
) => ({
    ...meta,
    fields: enrichFields(meta.fields, namespace, source)
});

const enrichMetaCollectionField = (
    meta: MetaTyped & MetaCollection,
    namespace: string,
    source: MetaGroup[]
) => {
    if (!isNeedEnrichment(meta.itemMeta)) {
        return meta;
    }
    const type = meta.itemMeta as string;
    return {
        ...meta,
        itemMeta: enrichFieldMeta({ namespace, type }, source)
    };
};

const enrichMetaMapField = (meta: MetaTyped & MetaMap, namespace: string, source: MetaGroup[]) => {
    let keyMeta = meta.keyMeta;
    if (isNeedEnrichment(keyMeta)) {
        const keyType = meta.keyMeta as string;
        keyMeta = enrichFieldMeta({ namespace, type: keyType }, source);
    }
    let valueMeta = meta.valueMeta;
    if (isNeedEnrichment(valueMeta)) {
        const valueType = meta.valueMeta as string;
        valueMeta = enrichFieldMeta({ namespace, type: valueType }, source);
    }
    return {
        ...meta,
        keyMeta,
        valueMeta
    };
};

const enrichMetaTypedefField = (
    { meta }: MetaTyped & MetaTypedef,
    namespace: string,
    source: MetaGroup[]
) => {
    console.log(meta);
    if (isString(meta)) {
        const condition = getCondition(meta, namespace);
        return enrichFieldMeta(condition, source);
    }
    const type = (meta as MetaTyped).type;
    if (!type) {
        return meta;
    }
    switch (type) {
        case MetaType.struct:
        case MetaType.union:
        case MetaType.collection:
        case MetaType.map:
            return enrichFieldMeta({ type, namespace }, source);
        case MetaType.primitive:
            return meta;
        case MetaType.typedef:
            throw Error('Invalid state');
    }
};

const enrichFieldMeta = (condition: MetaTypeCondition, source: MetaGroup[]) => {
    let meta = findMeta<(MetaTyped & MetaObject) | MetaCollection | MetaMap | MetaTypedef>(
        condition,
        source
    );
    switch (meta.type) {
        case MetaType.struct:
        case MetaType.union:
            meta = enrichMetaObjectField(
                meta as MetaTyped & MetaObject,
                condition.namespace,
                source
            );
            break;
        case MetaType.collection:
            meta = enrichMetaCollectionField(meta as MetaCollection, condition.namespace, source);
            break;
        case MetaType.map:
            meta = enrichMetaMapField(meta as MetaMap, condition.namespace, source);
            break;
        case MetaType.typedef:
            meta = enrichMetaTypedefField(meta as MetaTypedef, condition.namespace, source);
            break;
    }
    return meta;
};

function enrichField(field: MetaField, namespace: string, source: MetaGroup[]): MetaField {
    if (!isNeedEnrichment(field.meta)) {
        return field;
    }
    const metaType = field.meta as string; // field.meta is string after isNeedEnrichment check
    const condition = getCondition(metaType, namespace);
    return {
        ...field,
        meta: enrichFieldMeta(condition, source)
    };
}

const enrichFields = (fields: MetaField[], namespace: string, source: MetaGroup[]): MetaField[] =>
    fields.map(f => enrichField(f, namespace, source));

function enrichMeta(
    target: MetaObject & MetaTypeDefined,
    namespace: string,
    source: MetaGroup[]
): MetaObject & MetaTypeDefined {
    if (!target || !namespace || !source) {
        return null;
    }
    return {
        ...target,
        fields: enrichFields(target.fields, namespace, source)
    };
}

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
    console.log('Initial', initial);
    const target = findMeta<MetaTypeDefined & MetaObject>({ namespace, type }, initial);
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
