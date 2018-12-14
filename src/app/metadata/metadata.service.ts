import { Injectable } from '@angular/core';
import { Enum as ASTEnum, Field as ASTField, JsonAST, MapType, ThriftType, ValueType } from 'thrift-ts/lib/thrift-parser';
import Int64 from 'thrift-ts/lib/int64';
import isNil from 'lodash-es/isNil';

import * as metadataFiles from '../../assets/gen-json.json';
import { model } from '../thrift/model';

export type ListStructures = 'map' | 'list' | 'set';
export type ComplexStructures = 'namespace' | 'typedef' | 'include' | 'const' | 'enum' | 'struct' | 'union' | 'exception' | 'service';

export type ComplexType = TypeDef | Const | Enum | Struct | Union | Exception;
export type Type = ComplexType | Simple | MetaSet | MetaList | MetaMap;

export type Field = Pick<ASTField, Exclude<keyof ASTField, 'type'>> & { type: Type; parent: Type };

export class Structure {
    structure: ThriftType | ListStructures | ComplexStructures;
    name: ThriftType | ListStructures | string;
    createThrift: (...args: any[]) => any;

    toThrift(data: any) {
        return data;
    }
}

/**
 * Complex structures
 */

abstract class ComplexStructure extends Structure {
    structure: ComplexStructures;
    name: string;
}

export class TypeDef extends ComplexStructure {
    structure: ComplexStructures = 'typedef';
    type: Type;

    toThrift(data) {
        return this.type.toThrift(data);
    }
}

export class Const extends ComplexStructure {
    structure: ComplexStructures = 'const';
    // TODO
}

export class Enum extends ComplexStructure {
    structure: ComplexStructures = 'enum';
    items: ASTEnum[];
}

export class Struct extends ComplexStructure {
    structure: ComplexStructures = 'struct';
    fields: Field[];

    toThrift(data) {
        if (data === null) {
            return null;
        }
        const struct = this.createThrift();
        for (const param in data) {
            if (data.hasOwnProperty(param)) {
                const field: Field = this.fields.find(({name}) => name === param);
                struct[param] = field ? field.type.toThrift(data[param]) : data[param];
            }
        }
        return struct;
    }
}

export class Union extends ComplexStructure {
    structure: ComplexStructures = 'union';
    fields: Field[];

    toThrift(data) {
        if (data === null) {
            return null;
        }
        const struct = this.createThrift();
        for (const param in data) {
            if (data.hasOwnProperty(param)) {
                const field: Field = this.fields.find(({name}) => name === param);
                struct[param] = field ? field.type.toThrift(data[param]) : data[param];
            }
        }
        return struct;
    }
}

export class Exception extends ComplexStructure {
    structure: ComplexStructures = 'exception';
    fields: Field[];

    toThrift(data) {
        if (data === null) {
            return null;
        }
        const struct = this.createThrift();
        for (const param in data) {
            if (data.hasOwnProperty(param)) {
                const field: Field = this.fields.find(({name}) => name === param);
                struct[param] = field ? field.type.toThrift(data[param]) : data[param];
            }
        }
        return struct;
    }
}

/**
 * Simple structure
 */

export class Simple extends Structure {
    structure: ThriftType;

    get name() {
        return this.structure;
    }

    toThrift(data) {
        if (data === null) {
            return null;
        }
        switch (this.structure) {
            case 'i64':
                return new Int64(Number(data));
            case 'int':
            case 'double':
            case 'i8':
            case 'i16':
            case 'i32':
                return Number(data);
        }
        return data;
    }
}

/**
 * List structures
 */

export abstract class ListStructure extends Structure {
    structure: ListStructures;
    valueType: Type;

    constructor(valueType: Type) {
        super();
        this.valueType = valueType;
    }

    get name() {
        return `<${this.valueType.name}>`;
    }

    toThrift(data) {
        if (data === null || !Array.isArray(data)) {
            return null;
        }
        return data.map((item) => this.valueType.toThrift(item));
    }
}

export class MetaSet extends ListStructure {
    structure: ListStructures = 'set';
}

export class MetaList extends ListStructure {
    structure: ListStructures = 'list';
}

export class MetaMap extends ListStructure {
    structure: ListStructures = 'map';
    keyType: Type;

    constructor(keyType: Type, valueType: Type) {
        super(valueType);
        this.keyType = keyType;
    }

    get name() {
        return `<${this.keyType.name}, ${this.valueType.name}>`;
    }

    toThrift(data) {
        if (data === null || !(data instanceof Map || Array.isArray(data))) {
            return null;
        }
        const map = new Map();
        for (const [key, value] of Array.from(data)) {
            map.set(this.keyType.toThrift(key), this.valueType.toThrift(value));
        }
        return map;
    }
}

export interface MetadataFile {
    name: string;
    path: string;
    ast: JsonAST;
}

enum SimpleTypes {
    int = 'int',
    bool = 'bool',
    i8 = 'i8',
    i16 = 'i16',
    i32 = 'i32',
    i64 = 'i64',
    string = 'string',
    double = 'double',
    binary = 'binary'
}

const simpleTypes = Object.keys(SimpleTypes);

@Injectable()
export class MetadataService {

    files: MetadataFile[] = metadataFiles as any;
    metadata: { [name: string]: { [name: string]: ComplexType } };
    simple: { [name in ThriftType]: Simple } = simpleTypes.reduce((acc, item) => {
        const simple = new Simple();
        simple.structure = item as any;
        return {
            ...acc,
            [item]: simple
        };
    }, {}) as any;

    constructor() {
        this.get = this.get.bind(this);
        this.init();
    }

    static isEqualValue(valueA: any, valueB: any) {
        if (valueA === valueB) {
            return true;
        }
        if (isNil(valueA) || isNil(valueB)) {
            return false;
        }
        if (typeof valueA === 'object' && typeof valueB === 'object') {
            if (!valueA as any instanceof valueB.constructor) {
                return false;
            }
            if (valueA instanceof Map) {
                valueA = Array.from(valueA);
                valueB = Array.from(valueB);
            }
            const keysA = Object.keys(valueA);
            const keysB = Object.keys(valueB);
            if (keysA.length !== keysB.length) {
                return false;
            }
            for (const key of keysA) {
                if (!keysB.includes(key) || !MetadataService.isEqualValue(valueA[key], valueB[key])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    // TODO to Metadata like Node
    init(): void {
        const toCookList = [];
        this.metadata = this.files.reduce((metadata, {name, ast}) => ({
            ...metadata,
            [name]: Object.keys(ast).reduce((acc, structureName) => ({
                ...acc,
                ...Object.keys(ast[structureName]).reduce((objs, itemName) => {
                    const item = ast[structureName][itemName];
                    const {result, toCookList: toCookListPart} = this.create(objs, itemName, item, structureName, name);
                    toCookList.push(...toCookListPart);
                    return {
                        ...objs,
                        [itemName]: result
                    };
                }, {})
            }), {})
        }), {});
        while (toCookList.length) {
            toCookList.pop()();
        }
    }

    create(objs, itemName, item, structureName, name) {
        const toCookList = [];
        let result;
        switch (structureName) {
            case 'typedef':
                result = new TypeDef();
                toCookList.push(() => {
                    result.type = this.get(item.type, name);
                });
                break;
            case 'const':
                result = new Const();
                break;
            case 'enum':
                result = new Enum();
                result.items = item.items.map((elem, idx) => ({name: elem.name, value: elem.value === undefined ? idx : elem.value}));
                break;
            case 'struct':
                result = new Struct();
                toCookList.push(() => {
                    result.fields = item.map(field => ({
                        ...field,
                        type: this.get(field.type, name),
                        parent: result
                    }));
                });
                break;
            case 'union':
                result = new Union();
                toCookList.push(() => {
                    result.fields = item.map(field => ({
                        ...field,
                        type: this.get(field.type, name),
                        parent: result
                    }));
                });
                break;
            case 'exception':
                result = new Exception();
                toCookList.push(() => {
                    result.fields = item.map(field => ({
                        ...field,
                        type: this.get(field.type, name),
                        parent: result
                    }));
                });
                break;
            default:
                return objs;
        }
        result.name = itemName;
        result.createThrift = model[name] && model[name][itemName] ? (...args) => new (model[name][itemName] as any)(...args) : undefined;
        return {result, toCookList};
    }

    getType(stringValueType: string, parent: string): { parent?: string, type: string, isSimple: boolean } {
        if (simpleTypes.includes(stringValueType)) {
            return {type: stringValueType, isSimple: true};
        }
        const typeParts = stringValueType.split('.');
        return typeParts[1] ? {parent: typeParts[0], type: typeParts[1], isSimple: false} : {parent, type: stringValueType, isSimple: false};
    }

    get<T extends keyof JsonAST>(valueType: ValueType, parent: string): Type {
        if (typeof valueType === 'string') {
            const typeParts = this.getType(valueType, parent);
            if (typeParts.isSimple) {
                return this.simple[valueType];
            }
            return this.metadata[typeParts.parent][typeParts.type];
        }
        switch (valueType.name) {
            case 'map':
                return new MetaMap(this.get((valueType as MapType).keyType, parent), this.get(valueType.valueType, parent));
            case 'list':
                return new MetaList(this.get(valueType.valueType, parent));
            case 'set':
                return new MetaSet(this.get(valueType.valueType, parent));
        }
    }
}
