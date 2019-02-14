export interface MetaTyped {
    type: MetaType;
}

export interface MetaObject {
    fields: MetaField[];
}

export interface MetaTypeDefined {
    name: string;
}

export interface MetaField {
    required: boolean;
    name: string;
    meta: MetaTyped | MetaObject | MetaTypeDefined | string;
}

export interface MetaStruct extends MetaTyped, MetaObject, MetaTypeDefined {
    isRef: boolean;
}

export interface MetaUnion extends MetaTyped, MetaObject, MetaTypeDefined {
    settedField: string | null;
}

export interface MetaPrimitive extends MetaTyped {
    primitiveType: PrimitiveType;
    value?: string | number;
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
    meta: MetaTyped | MetaObject | MetaTypeDefined | string;
}

export enum MetaType {
    struct = 'struct',
    union = 'union',
    primitive = 'primitive',
    collection = 'collection',
    map = 'map',
    enum = 'enum',
    typedef = 'typedef'
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
    binary = 'binary'
}

export enum CollectionType {
    set = 'set',
    list = 'list'
}

export * from './ast-definition';
