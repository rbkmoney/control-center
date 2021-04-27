export interface MetaTyped {
    type: MetaType;
}

export interface MetaObject {
    virgin: boolean;
    fields: MetaField[];
}

export interface MetaTypeDefined {
    namespace: string;
    name: string;
}

export interface MetaField {
    required: boolean;
    name: string;
    meta: MetaTyped | string;
}

export interface MetaStruct extends MetaTyped, MetaObject, MetaTypeDefined {
    isRef: boolean;
}

export interface MetaUnion extends MetaTyped, MetaObject, MetaTypeDefined {
    settedField: string | null;
}

export interface MetaPrimitive extends MetaTyped {
    primitiveType: PrimitiveType;
    value?: string | number | boolean;
}

export interface MetaEnum extends MetaTyped {
    items: { name: string; value: string | number | boolean }[];
    value?: number;
}

export interface MetaCollection extends MetaTyped {
    collectionType: CollectionType;
    itemMeta: MetaTyped | string;
    value?: MetaTyped[];
}

export interface MetaMap extends MetaTyped {
    keyMeta: MetaTyped | string;
    valueMeta: MetaTyped | string;
    value?: Map<MetaTyped, MetaTyped>;
}

export interface MetaTypedef extends MetaTyped {
    meta: MetaTyped | string;
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum MetaType {
    struct = 'struct',
    union = 'union',
    primitive = 'primitive',
    collection = 'collection',
    map = 'map',
    enum = 'enum',
    typedef = 'typedef',
}

export enum PrimitiveType {
    string = 'string',
    i8 = 'i8',
    i16 = 'i16',
    i32 = 'i32',
    i64 = 'i64',
    bool = 'bool',
    int = 'int',
    double = 'double',
    binary = 'binary',
}

export enum CollectionType {
    set = 'set',
    list = 'list',
}
/* eslint-enable @typescript-eslint/naming-convention */

export * from './ast-definition';
