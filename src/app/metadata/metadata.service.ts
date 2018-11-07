import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Field, JsonAST, ThriftType, ValueType } from 'thrift-ts/src/thrift-parser';

export type SimpleStructures = 'map' | 'list' | 'set';
export type ComplexStructures = 'namespace' | 'typedef' | 'include' | 'const' | 'enum' | 'struct' | 'union' | 'exception' | 'service';

export type Type0 = TypeDef | Const | Enum | Struct | Union | Exception;
export type Type2 = Type0 | Simple | Set | List | Map;

export type Field2 = Pick<Field, Exclude<keyof Field, 'type'>> & { type: Type2; parent: Type2 };

export interface Metadata {
    structure: ThriftType | SimpleStructures | ComplexStructures;
    name: ThriftType | SimpleStructures | string;
}

/**
 * Thrift parser structures
 */

abstract class ComplexStructure implements Metadata {
    structure: ComplexStructures;
    name: string;
}

export class TypeDef extends ComplexStructure {
    structure: ComplexStructures = 'typedef';
    type: Type2;
}

export class Const extends ComplexStructure {
    structure: ComplexStructures = 'const';
    // TODO
}

export class Enum extends ComplexStructure {
    structure: ComplexStructures = 'enum';
    items: Enum[];
}

export class Struct extends ComplexStructure {
    structure: ComplexStructures = 'struct';
    fields: Field2[];
}

export class Union extends ComplexStructure {
    structure: ComplexStructures = 'union';
    fields: Field2[];
}

export class Exception extends ComplexStructure {
    structure: ComplexStructures = 'exception';
    fields: Field2[];
}

/**
 * Basic structures
 */

abstract class SimpleStructure implements Metadata {
    structure: SimpleStructures | ThriftType;

    get name() {
        return this.structure;
    }
}

export class Simple extends SimpleStructure {
    structure: ThriftType;

    get name() {
        return this.structure;
    }
}

abstract class SimpleComplexStructure extends SimpleStructure {
    structure: SimpleStructures;
    valueType: Type2;
}

export class Set extends SimpleComplexStructure {
    structure: SimpleStructures = 'set';
}

export class List extends SimpleComplexStructure {
    structure: SimpleStructures = 'list';
}

export class Map extends SimpleComplexStructure {
    structure: SimpleStructures = 'map';
    keyType: Type2;
}

export interface MetadataFile {
    name: string;
    path: string;
    ast: JsonAST;
}

const simpleTypes = ['int', 'bool', 'i8', 'i16', 'i32', 'i64', 'string', 'double', 'binary'];

@Injectable()
export class MetadataService {

    public files: MetadataFile[];
    public metadata: { [name: string]: { [name: string]: Type0 } };
    public simple: { [name in ThriftType]: Simple } = simpleTypes.reduce((acc, item) => {
        const simple = new Simple();
        simple.structure = item as any;
        return {
            ...acc,
            [item]: simple
        };
    }, {}) as any;

    constructor(private http: HttpClient) {
    }

    public async init(url: string): Promise<void> {
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
                            break;
                        case 'const':
                            result = new Const();
                            break;
                        case 'enum':
                            result = new Enum();
                            result.items = item.items;
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
                    return {
                        ...objs,
                        [itemName]: result
                    };
                }, {})
            }), {})
        }), {});
        toCookList.forEach((fc) => fc());
    }

    public get<T extends keyof JsonAST>(valueType: ValueType, parent: string): Type2 {
        if (typeof valueType === 'string') {
            if (this.simple[valueType]) {
                return this.simple[valueType];
            }
            const typeParts = valueType.split('.');
            return typeParts[1] ? this.metadata[typeParts[0]][typeParts[1]] : this.metadata[parent][valueType];
        }
        switch (valueType.name) {
            case 'map':
                const map = new Map();
                Object.defineProperty(map, 'valueType', {
                    get: () => {
                        return this.get(valueType.valueType, parent);
                    }
                });
                Object.defineProperty(map, 'keyType', {
                    get: () => {
                        return this.get(valueType.keyType, parent);
                    }
                });
                return map;
            case 'list':
                const list = new List();
                Object.defineProperty(list, 'valueType', {
                    get: () => {
                        return this.get(valueType.valueType, parent);
                    }
                });
                return list;
            case 'set':
                const set = new Set();
                Object.defineProperty(set, 'valueType', {
                    get: () => {
                        return this.get(valueType.valueType, parent);
                    }
                });
                return set;
        }
    }
}
