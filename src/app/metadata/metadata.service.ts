import { Injectable } from '@angular/core';
import endsWith from 'lodash-es/endsWith';
import isString from 'lodash-es/isString';
import startsWith from 'lodash-es/startsWith';

import { MetadataConfigService } from './metadata-config.service';
import { MetadataObject } from './model/metadata-object.class';
import { MetadataField } from './model/metadata-field.class';
import { Required } from './model/required.enum';
import { TypeName } from './model/type-name.enum';
import { MetadataReferenceType } from './model/metadata-reference-type.class';
import { MetadataIterableType } from './model/metadata-iterable-type.class';
import { MetadataMapType } from './model/metadata-map-type.class';
import { MetadataEnum } from './model/metadata-enum.class';
import { MetadataNamespace } from './model/metadata-namespace.enum';
import { MetadataEnumType } from './model/metadata-enum-type.class';
import { MetadataType } from './model/metadata-type.class';

@Injectable()
export class MetadataService {

    private metadata: any;
    private structs: MetadataObject[];
    private enums: MetadataEnum[];

    constructor(private metadataConfigService: MetadataConfigService) {
        this.metadata = this.metadataConfigService.getMetadataConfig();
        this.structs = this.typingStructs(this.metadata.structs);
        this.enums = this.metadata.enums;
    }

    public getMetadata(structName: string): MetadataObject {
        return this.structs.find((struct) => struct.name === structName);
    }

    public getEnumMetadata(enumName: string): MetadataEnum {
        return this.enums.find((enumItem) => enumItem.name === enumName);
    }

    private typingStructs(structs: any): MetadataObject[] {
        return structs.map((struct) => this.typingStruct(struct));
    }

    private typingStruct(struct: any): MetadataObject {
        const result = new MetadataObject();
        let enumCrutch;
        if (struct.name) {
            result.name = struct.name;
            enumCrutch = this.searchEnumCrutch('struct', struct.name);
            result.isRef = endsWith(struct.name, 'Ref');
        }
        if (struct.doc) {
            result.doc = struct.doc;
        }
        if (typeof struct.isException !== 'undefined') {
            result.isException = struct.isException;
        }
        if (typeof struct.isUnion !== 'undefined') {
            result.isUnion = struct.isUnion;
        }
        if (struct.fields) {
            result.fields = this.typingFields(struct.fields, enumCrutch);
        }
        if (struct.namespace) {
            result.namespace = this.typingNamespace(struct.namespace);
        }
        return result;
    }

    private typingFields(fields: any, enumCrutch: any): MetadataField[] {
        return fields.map((field) => this.typingField(field, enumCrutch ? this.searchEnumCrutch('field', field.name) : undefined));
    }

    private typingField(field: any, enumCrutch: any): MetadataField {
        const result = new MetadataField();
        if (field.key) {
            result.key = field.key;
        }
        if (field.name) {
            result.name = field.name;
        }
        if (field.doc) {
            result.doc = field.doc;
        }
        if (field.required) {
            result.required = this.typingRequired(field.required);
        }
        if (enumCrutch) {
            result.typeId = TypeName.enum;
            result.type = new MetadataEnumType(enumCrutch.enumName);
        } else {
            if (field.typeId) {
                result.typeId = this.typingTypeName(field.typeId);
            }
            if (field.type) {
                result.type = this.typingMetadataType(field.type);
            }
        }
        return result;
    }

    private typingMetadataType(type: any): MetadataType {
        switch (type.typeId) {
            case 'struct':
                return this.createMetadataReferenceType(type);
            case 'union':
                return this.createMetadataReferenceType(type);
            case 'set':
                return this.createMetadataIterableType(type);
            case 'list':
                return this.createMetadataIterableType(type);
            case 'map':
                return this.createMetadataMapType(type);
        }
    }

    private createMetadataReferenceType(type: any): MetadataReferenceType {
        const result = new MetadataReferenceType();
        result.typeId = this.typingTypeName(type.typeId);
        if (type.class) {
            result.className = this.filterClassName(type.class);
        }
        return result;
    }

    private createMetadataIterableType(type: any): MetadataIterableType {
        const result = new MetadataIterableType();
        result.typeId = this.typingTypeName(type.typeId);
        if (type.elemTypeId) {
            result.elemTypeId = this.typingTypeName(type.elemTypeId);
        }
        if (type.elemType) {
            result.elemType = this.typingMetadataType(type.elemType);
        }
        return result;
    }

    private createMetadataMapType(type: any): MetadataMapType {
        const result = new MetadataMapType();
        result.typeId = this.typingTypeName(type.typeId);
        if (type.keyTypeId) {
            result.keyTypeId = this.typingTypeName(type.keyTypeId);
        }
        if (type.valueTypeId) {
            result.valueTypeId = this.typingTypeName(type.valueTypeId);
        }
        if (type.keyType) {
            result.keyType = this.typingMetadataType(type.keyType);
        }
        if (type.valueType) {
            result.valueType = this.typingMetadataType(type.valueType);
        }
        return result;
    }

    private filterClassName(className: string): string {
        let result = className;
        for (const namespace in MetadataNamespace) {
            if (isString(namespace) && startsWith(className, namespace)) {
                result = className.replace(`${namespace}.`, '');
            }
        }
        return result;
    }

    private searchEnumCrutch(crutchField, value) {
        return this.metadata.enumCrutch.find((crutch: any) => crutch[crutchField] === value);
    }

    private typingTypeName(value: string): TypeName {
        return TypeName[value];
    }

    private typingRequired(value: string): Required {
        return Required[value];
    }

    private typingNamespace(namespaceName: string): MetadataNamespace {
        return MetadataNamespace[namespaceName];
    }
}
