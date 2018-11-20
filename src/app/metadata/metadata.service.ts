import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enum as ASTEnum, Field as ASTField, JsonAST, MapType, ThriftType, ValueType } from 'thrift-ts/lib/thrift-parser';
import Int64 from 'thrift-ts/lib/int64';

import { model } from '../thrift/model';

export type SimpleStructures = 'map' | 'list' | 'set';
export type ComplexStructures = 'namespace' | 'typedef' | 'include' | 'const' | 'enum' | 'struct' | 'union' | 'exception' | 'service';

export type ComplexType = TypeDef | Const | Enum | Struct | Union | Exception;
export type Type = ComplexType | Simple | MetaSet | MetaList | MetaMap;

export type Field = Pick<ASTField, Exclude<keyof ASTField, 'type'>> & { type: Type; parent: Type };

export class Metadata {
    structure: ThriftType | SimpleStructures | ComplexStructures;
    name: ThriftType | SimpleStructures | string;
    createThrift: (...args: any[]) => any;

    toThrift(data: any) {
        return data;
    }
}

/**
 * Thrift parser structures
 */

abstract class ComplexStructure extends Metadata {
    structure: ComplexStructures;
    name: string;
}

export class TypeDef extends ComplexStructure {
    structure: ComplexStructures = 'typedef';
    type: Type;
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
                struct[param] = data[param];
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
                struct[param] = data[param];
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
                struct[param] = data[param];
            }
        }
        return struct;
    }
}

/**
 * Basic structures
 */

export class Simple extends Metadata {
    structure: ThriftType;

    get name() {
        return this.structure;
    }

    toThrift(data) {
        if (this.structure === 'i64') {
            if (data === null) {
                return null;
            }
            return new Int64(data);
        }
        return super.toThrift(data);
    }
}

export abstract class SimpleComplexStructure extends Metadata {
    structure: SimpleStructures;
    valueType: Type;

    get name() {
        return `<${this.valueType.name}>`;
    }
}

export class MetaSet extends SimpleComplexStructure {
    structure: SimpleStructures = 'set';
}

export class MetaList extends SimpleComplexStructure {
    structure: SimpleStructures = 'list';
}

export class MetaMap extends SimpleComplexStructure {
    structure: SimpleStructures = 'map';
    keyType: Type;

    get name() {
        return `<${this.keyType.name}, ${this.valueType.name}>`;
    }
}

export interface MetadataFile {
    name: string;
    path: string;
    ast: JsonAST;
}

const simpleTypes = ['int', 'bool', 'i8', 'i16', 'i32', 'i64', 'string', 'double', 'binary'];

@Injectable()
export class MetadataService {

    files: MetadataFile[];
    metadata: { [name: string]: { [name: string]: ComplexType } };
    simple: { [name in ThriftType]: Simple } = simpleTypes.reduce((acc, item) => {
        const simple = new Simple();
        simple.structure = item as any;
        return {
            ...acc,
            [item]: simple
        };
    }, {}) as any;

    constructor(private http: HttpClient) {
    }

    // TODO to Metadata like Node
    async init(url: string): Promise<void> {
        this.files = await this.http.get<any>(url).toPromise();
        const get = this.get.bind(this);
        const toCookList = [];
        this.metadata = this.files.reduce((metadata, {name, ast}) => ({
            ...metadata,
            [name]: Object.keys(ast).reduce((acc, structureName) => ({
                ...acc,
                ...Object.keys(ast[structureName]).reduce((objs, itemName) => {
                    const item = ast[structureName][itemName];
                    let result;
                    switch (structureName) {
                        case 'typedef':
                            result = new TypeDef();
                            toCookList.push(() => {
                                result.type = get(item.type, name);
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
                                    type: get(field.type, name),
                                    parent: result
                                }));
                            });
                            break;
                        case 'union':
                            result = new Union();
                            toCookList.push(() => {
                                result.fields = item.map(field => ({
                                    ...field,
                                    type: get(field.type, name),
                                    parent: result
                                }));
                            });
                            break;
                        case 'exception':
                            result = new Exception();
                            toCookList.push(() => {
                                result.fields = item.map(field => ({
                                    ...field,
                                    type: get(field.type, name),
                                    parent: result
                                }));
                            });
                            break;
                        default:
                            return objs;
                    }
                    result.name = itemName;
                    result.createThrift = model[name] && model[name][itemName] ? (...args) => new model[name][itemName](...args) : undefined;
                    return {
                        ...objs,
                        [itemName]: result
                    };
                }, {})
            }), {})
        }), {});
        toCookList.forEach((fc) => fc());
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
                const map = new MetaMap();
                Object.defineProperty(map, 'valueType', {
                    get: () => {
                        return this.get(valueType.valueType, parent);
                    }
                });
                Object.defineProperty(map, 'keyType', {
                    get: () => {
                        return this.get((valueType as MapType).keyType, parent);
                    }
                });
                return map;
            case 'list':
                const list = new MetaList();
                Object.defineProperty(list, 'valueType', {
                    get: () => {
                        return this.get(valueType.valueType, parent);
                    }
                });
                return list;
            case 'set':
                const set = new MetaSet();
                Object.defineProperty(set, 'valueType', {
                    get: () => {
                        return this.get(valueType.valueType, parent);
                    }
                });
                return set;
        }
    }
}
