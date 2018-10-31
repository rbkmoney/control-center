import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { MetadataConfigService } from './metadata-config.service';
import { MetadataObject } from './model/metadata-object.class';
import { MetadataField } from './model/metadata-field.class';
import { Required } from './model/required.enum';
import { TypeName } from './model/type-name.enum';
import { MetadataReferenceType } from './model/metadata-reference-type.class';
import { MetadataIterableType } from './model/metadata-iterable-type.class';
import { MetadataMapType } from './model/metadata-map-type.class';
import { MetadataEnum } from './model/metadata-enum.class';
import { EnumTypingService } from './enum-typing.service';
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
        this.enums = EnumTypingService.typingEnums(this.metadata.enums);
    }

    public getMetadata(structName: string): MetadataObject {
        return _.find(this.structs, (struct: any) => struct.name === structName);
    }

    public getEnumMetadata(enumName: string): MetadataEnum {
        return _.find(this.enums, (enumItem) => enumItem.name === enumName);
    }

    private typingStructs(structs: any): MetadataObject[] {
        const result: MetadataObject[] = [];
        _.forEach(structs, (struct) => result.push(this.typingStruct(struct)));
        return result;
    }

    private typingStruct(struct: any): MetadataObject {
        const result = new MetadataObject();
        let enumCrutch;
        if (struct.name) {
            result.name = struct.name;
            enumCrutch = this.searchEnumCrutch('struct', struct.name);
            result.isRef = _.endsWith(struct.name, 'Ref');
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
        const result: MetadataField[] = [];
        _.forEach(fields, (field) => {
            let enumCrutchField;
            if (enumCrutch) {
                enumCrutchField = this.searchEnumCrutch('field', field.name);
            }
            result.push(this.typingField(field, enumCrutchField));
        });
        return result;
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
        let result: any;
        switch (type.typeId) {
            case 'struct':
                result = this.createMetadataReferenceType(type);
                break;
            case 'union':
                result = this.createMetadataReferenceType(type);
                break;
            case 'set':
                result = this.createMetadataIterableType(type);
                break;
            case 'list':
                result = this.createMetadataIterableType(type);
                break;
            case 'map':
                result = this.createMetadataMapType(type);
                break;
            default:
                break;
        }
        return result;
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
        if (type.elemType)   {
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
        _.forEach(MetadataNamespace, (namespace) => {
            if (_.isString(namespace) && _.startsWith(className, namespace)) {
                result = _.replace(className, `${namespace}.`, '');
            }
        });
        return result;
    }

    private searchEnumCrutch(crutchField, value) {
        return _.find(this.metadata.enumCrutch, (crutch: any) => crutch[crutchField] === value);
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
