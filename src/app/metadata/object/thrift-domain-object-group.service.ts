import cloneDeep from 'lodash-es/cloneDeep';
import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';

import { ThriftDomainGroup } from './thrift-damain-group';
import { ThriftDomainObject } from './thrift-domain-object';
import { ObjectMetadata } from './object-metadata';
import { MetadataObject } from '../model/metadata-object.class';
import { MetadataField } from '../model/metadata-field.class';
import { MetadataReferenceType } from '../model/metadata-reference-type.class';

export class ThriftDomainObjectGroupService {

    public static groupThriftDomain(thriftDomain: Map<any, any>, metadataDomain: MetadataObject): ThriftDomainGroup[] {
        const thriftDomainObjects = [];
        thriftDomain.forEach((item) => thriftDomainObjects.push(this.toThriftDomainObject(item)));
        const grouped = groupBy(thriftDomainObjects, 'name');
        return map(grouped, (objects, name) =>
            new ThriftDomainGroup(name, this.findClassName(metadataDomain, name), objects));
    }

    public static findClassName(metadataDomain: MetadataObject, fieldName: string): string {
        const found = metadataDomain.fields.find((field: MetadataField) => field.name === fieldName);
        const type = found.type as MetadataReferenceType;
        return type.className;
    }

    public static toThriftDomainObject(thriftDomainObject: any): ThriftDomainObject {
        const result = new ThriftDomainObject();
        thriftDomainObject.forEach((value: any, fieldName: string) => {
            if (value) {
                result.name = fieldName;
                result.ref = this.toObjectMetadata(value.ref);
                result.data = this.toObjectMetadata(value.data);
                result.thriftObject = cloneDeep(value);
            }
        });
        return result;
    }

    private static toObjectMetadata(object): ObjectMetadata[] {
        return map(object, (value, key) => {
            const objectMetadata = new ObjectMetadata();
            objectMetadata.name = key;
            if (this.isPrimitive(value)) {
                objectMetadata.value = value;
            } else {
                objectMetadata.value = 'object...';

            }
            return objectMetadata;
        });
    }

    private static isPrimitive(value: any): boolean {
        return typeof value === 'string'
            || typeof value === 'number'
            || typeof value === 'boolean';
    }
}
