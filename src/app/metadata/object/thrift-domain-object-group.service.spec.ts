import { ThriftDomainObjectGroupService } from './thrift-domain-object-group.service';
import { ObjectMetadata } from './object-metadata';
import { ThriftDomainObject } from './thrift-domain-object';
import { ThriftDomainGroup } from './thrift-damain-group';
import { MetadataField } from '../model/metadata-field.class';
import { MetadataReferenceType } from '../model/metadata-reference-type.class';
import { MetadataObject } from '../model/metadata-object.class';
import { TypeName } from '../model/type-name.enum';

describe('Thrift domain object group service:', () => {

    it('should get metadata', () => {
        const targetThriftObject = {
            ref: {
                id: 1
            },
            data: {
                name: 'Test name',
                isValid: true,
                count: 1,
                someObject: {}
            }
        };

        const thriftDomainObject = {
            bank_card_bin_range: null,
            category: targetThriftObject
        };

        const result = ThriftDomainObjectGroupService.toThriftDomainObject(thriftDomainObject);

        const refId = new ObjectMetadata('id', 1);
        const dataName = new ObjectMetadata('name', 'Test name');
        const dataIsValid = new ObjectMetadata('isValid', true);
        const dataCount = new ObjectMetadata('count', 1);
        const dataSomeObject = new ObjectMetadata('someObject', 'object...');
        const expected = new ThriftDomainObject('category', [refId], [dataName, dataIsValid, dataCount, dataSomeObject], targetThriftObject);

        expect(expected).toEqual(result);
    });

    it('should group thrift domain', () => {
        const thriftDomain = new Map();
        const targetThriftCategory = {
            ref: {
                id: 1
            },
            data: {
                name: 'Test name'
            }
        };
        thriftDomain.set({}, {
            category: targetThriftCategory
        });

        const targetThriftBank = {
            ref: {
                id: 1
            },
            data: {
                description: 'Test description'
            }
        };
        thriftDomain.set({}, {
            bank_card_bin_range: targetThriftBank,
            category: null
        });

        const categoryField = new MetadataField();
        categoryField.name = 'category';
        categoryField.type = new MetadataReferenceType(TypeName.struct, 'CategoryObject');

        const bankField = new MetadataField();
        bankField.name = 'bank_card_bin_range';
        bankField.type = new MetadataReferenceType(TypeName.struct, 'BankCardBinRangeObject');

        const metadataDomain = new MetadataObject();
        metadataDomain.name = 'DomainObject';
        metadataDomain.fields = [categoryField, bankField];

        const result = ThriftDomainObjectGroupService.groupThriftDomain(thriftDomain, metadataDomain);

        const refId = new ObjectMetadata('id', 1);
        const dataName = new ObjectMetadata('name', 'Test name');
        const categoryObject = new ThriftDomainObject('category', [refId], [dataName], targetThriftCategory);
        const categoryGroup = new ThriftDomainGroup('category', 'CategoryObject', [categoryObject]);

        const dataDescription = new ObjectMetadata('description', 'Test description');
        const bankObject = new ThriftDomainObject('bank_card_bin_range', [refId], [dataDescription], targetThriftBank);
        const bankGroup = new ThriftDomainGroup('bank_card_bin_range', 'BankCardBinRangeObject', [bankObject]);

        expect([categoryGroup, bankGroup]).toEqual(result);
    });
});
