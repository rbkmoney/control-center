import { MetadataService } from './metadata.service';
import { MetadataConfigService } from './metadata-config.service';
import { MetadataObject } from './model/metadata-object.class';
import { MetadataField } from './model/metadata-field.class';
import { MetadataIterableType } from './model/metadata-iterable-type.class';
import { MetadataReferenceType } from './model/metadata-reference-type.class';
import { MetadataMapType } from './model/metadata-map-type.class';
import { Required } from './model/required.enum';
import { TypeName } from './model/type-name.enum';
import { MetadataEnumMember } from './model/metadata-enum-member.class';
import { MetadataEnum } from './model/metadata-enum.class';
import { MetadataNamespace } from './model/metadata-namespace.enum';
import { MetadataEnumType } from './model/metadata-enum-type.class';

describe('Metadata service:', () => {

    it('should get simple structure', () => {
        const mockService = new MetadataConfigService(null);
        spyOn(mockService, 'getMetadataConfig').and.returnValue({
            structs: [
                {
                    fields: [
                        {
                            key: 1,
                            name: 'settlement',
                            required: 'required',
                            typeId: 'i64'
                        }
                    ],
                    name: 'Content'
                }
            ]
        });

        const metadataService = new MetadataService(mockService);

        const result = metadataService.getMetadata('Content');

        const expectedField = new MetadataField();
        expectedField.key = 1;
        expectedField.name = 'settlement';
        expectedField.required = Required.required;
        expectedField.typeId = TypeName.i64;

        const expected = new MetadataObject();
        expected.name = 'Content';
        expected.fields = [expectedField];
        expected.isRef = false;

        expect(expected).toEqual(result);
    });

    it('should get structure with set-field', () => {
        const mockService = new MetadataConfigService(null);
        spyOn(mockService, 'getMetadataConfig').and.returnValue({
            structs: [
                {
                    name: 'CurrencySelector',
                    isException: false,
                    isUnion: true,
                    fields: [
                        {
                            key: 1,
                            name: 'decisions',
                            typeId: 'set',
                            type: {
                                typeId: 'set',
                                elemTypeId: 'struct',
                                elemType: {
                                    typeId: 'struct',
                                    class: 'CurrencyDecision'
                                }
                            },
                            required: 'optional'
                        }
                    ]
                }
            ]
        });

        const metadataService = new MetadataService(mockService);

        const result = metadataService.getMetadata('CurrencySelector');

        const expectedElemType = new MetadataReferenceType();
        expectedElemType.typeId = TypeName.struct;
        expectedElemType.className = 'CurrencyDecision';

        const expectedType = new MetadataIterableType();
        expectedType.typeId = TypeName.set;
        expectedType.elemTypeId = TypeName.struct;
        expectedType.elemType = expectedElemType;

        const expectedField = new MetadataField();
        expectedField.key = 1;
        expectedField.name = 'decisions';
        expectedField.required = Required.optional;
        expectedField.typeId = TypeName.set;
        expectedField.type = expectedType;

        const expected = new MetadataObject();
        expected.name = 'CurrencySelector';
        expected.isException = false;
        expected.isUnion = true;
        expected.fields = [expectedField];
        expected.isRef = false;

        expect(expected).toEqual(result);
    });

    it('should get structure with union', () => {
        const mockService = new MetadataConfigService(null);
        spyOn(mockService, 'getMetadataConfig').and.returnValue({
            structs: [
                {
                    name: 'CurrencyDecision',
                    fields: [
                        {
                            key: 1,
                            name: 'if_',
                            typeId: 'union',
                            type: {
                                typeId: 'union',
                                class: 'Predicate'
                            }
                        }
                    ]
                }
            ]
        });

        const metadataService = new MetadataService(mockService);

        const result = metadataService.getMetadata('CurrencyDecision');

        const expectedType = new MetadataReferenceType();
        expectedType.typeId = TypeName.union;
        expectedType.className = 'Predicate';

        const expectedField = new MetadataField();
        expectedField.key = 1;
        expectedField.name = 'if_';
        expectedField.typeId = TypeName.union;
        expectedField.type = expectedType;

        const expected = new MetadataObject();
        expected.name = 'CurrencyDecision';
        expected.fields = [expectedField];
        expected.isRef = false;

        expect(expected).toEqual(result);
    });

    it('should get structure with map', () => {
        const mockService = new MetadataConfigService(null);
        spyOn(mockService, 'getMetadataConfig').and.returnValue({
            structs: [
                {
                    name: 'SystemAccountSet',
                    fields: [
                        {
                            key: 3,
                            name: 'accounts',
                            typeId: 'map',
                            type: {
                                typeId: 'map',
                                keyTypeId: 'struct',
                                valueTypeId: 'struct',
                                keyType: {
                                    typeId: 'struct',
                                    class: 'CurrencyRef'
                                },
                                valueType: {
                                    typeId: 'struct',
                                    class: 'SystemAccount'
                                }
                            }
                        }
                    ]
                }
            ]
        });

        const metadataService = new MetadataService(mockService);

        const result = metadataService.getMetadata('SystemAccountSet');

        const expectedKeyType = new MetadataReferenceType();
        expectedKeyType.typeId = TypeName.struct;
        expectedKeyType.className = 'CurrencyRef';

        const expectedValueType = new MetadataReferenceType();
        expectedValueType.typeId = TypeName.struct;
        expectedValueType.className = 'SystemAccount';

        const expectedType = new MetadataMapType();
        expectedType.typeId = TypeName.map;
        expectedType.keyTypeId = TypeName.struct;
        expectedType.valueTypeId = TypeName.struct;
        expectedType.keyType = expectedKeyType;
        expectedType.valueType = expectedValueType;

        const expectedField1 = new MetadataField();
        expectedField1.key = 3;
        expectedField1.name = 'accounts';
        expectedField1.typeId = TypeName.map;
        expectedField1.type = expectedType;

        const expected = new MetadataObject();
        expected.name = 'SystemAccountSet';
        expected.fields = [expectedField1];
        expected.isRef = false;

        expect(expected).toEqual(result);
    });

    it('should parse namespace', () => {
        const mockService = new MetadataConfigService(null);
        spyOn(mockService, 'getMetadataConfig').and.returnValue({
            structs: [
                {
                    name: 'TimedTermSet',
                    namespace: 'base',
                    fields: [
                        {
                            name: 'action_time',
                            typeId: 'struct',
                            type: {
                                typeId: 'struct',
                                class: 'base.TimestampInterval'
                            }
                        }
                    ]
                }
            ]
        });

        const metadataService = new MetadataService(mockService);

        const result = metadataService.getMetadata('TimedTermSet');

        const expectedType = new MetadataReferenceType();
        expectedType.typeId = TypeName.struct;
        expectedType.className = 'TimestampInterval';

        const expectedField = new MetadataField();
        expectedField.name = 'action_time';
        expectedField.typeId = TypeName.struct;
        expectedField.type = expectedType;

        const expected = new MetadataObject();
        expected.name = 'TimedTermSet';
        expected.namespace = MetadataNamespace.base;
        expected.fields = [expectedField];
        expected.isRef = false;

        expect(expected).toEqual(result);
    });

    it('should parse enum type', () => {
        const mockService = new MetadataConfigService(null);
        spyOn(mockService, 'getMetadataConfig').and.returnValue({
            enumCrutch: [
                {
                    struct: 'BankCardCondition',
                    field: 'payment_system_is',
                    enumName: 'BankCardPaymentSystem'
                }
            ],
            structs: [
                {
                    name: 'BankCardCondition',
                    namespace: 'domain',
                    fields: [
                        {
                            key: 1,
                            name: 'payment_system_is',
                            typeId: 'i32',
                            required: 'optional'
                        }
                    ]
                }
            ]
        });

        const metadataService = new MetadataService(mockService);

        const result = metadataService.getMetadata('BankCardCondition');

        const expectedField = new MetadataField();
        expectedField.key = 1;
        expectedField.name = 'payment_system_is';
        expectedField.typeId = TypeName.enum;
        expectedField.required = Required.optional;
        expectedField.type = new MetadataEnumType('BankCardPaymentSystem');

        const expected = new MetadataObject();
        expected.name = 'BankCardCondition';
        expected.namespace = MetadataNamespace.domain;
        expected.fields = [expectedField];
        expected.isRef = false;

        expect(expected).toEqual(result);
    });

    it('should parse enum', () => {
        const mockService = new MetadataConfigService(null);
        spyOn(mockService, 'getMetadataConfig').and.returnValue({
            enums: [
                {
                    name: 'MerchantCashFlowAccount',
                    members: [
                        {
                            name: 'settlement',
                            value: 0,
                            doc: 'test'
                        },
                        {
                            name: 'guarantee',
                            value: 1,
                            doc: 'test2'
                        }
                    ]
                }
            ]
        });

        const metadataService = new MetadataService(mockService);

        const result = metadataService.getEnumMetadata('MerchantCashFlowAccount');

        const expectedSettlement = new MetadataEnumMember('settlement', 0, 'test');
        const expectedGuarantee = new MetadataEnumMember('guarantee', 1, 'test2');
        const expected = new MetadataEnum('MerchantCashFlowAccount', [expectedSettlement, expectedGuarantee]);

        expect(expected).toEqual(result);
    });
    
    it('should check ref', () => {
        const mockService = new MetadataConfigService(null);
        spyOn(mockService, 'getMetadataConfig').and.returnValue({
            structs: [
                {
                    name: 'PartyPrototypeRef',
                    fields: [
                        {
                            key: 1,
                            name: 'id',
                            typeId: 'i32',
                            required: 'required'
                        }
                    ]
                }
            ]
        });

        const metadataService = new MetadataService(mockService);

        const result = metadataService.getMetadata('PartyPrototypeRef');

        const expectedField = new MetadataField();
        expectedField.key = 1;
        expectedField.name = 'id';
        expectedField.typeId = TypeName.i32;
        expectedField.required = Required.required;

        const expected = new MetadataObject();
        expected.isRef = true;
        expected.name = 'PartyPrototypeRef';
        expected.fields = [expectedField];

        expect(expected).toEqual(result);
    });
});
