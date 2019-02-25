import { enrichMeta } from './enrich-meta';
import { MetaType } from '../../model';

fdescribe('enrichMeta', () => {
    it('should enrich circular dependency', () => {
        const target = {
            type: MetaType.struct,
            fields: [
                {
                    required: true,
                    name: 'firstObjField',
                    meta: 'SecondObject'
                }
            ],
            name: 'FirstObject',
            isRef: false
        };

        const source = [
            {
                namespace: 'test',
                meta: [
                    target,
                    {
                        type: MetaType.struct,
                        fields: [
                            {
                                required: true,
                                name: 'secondObjField',
                                meta: 'ThirdObject'
                                // meta: 'FirstObject'
                            }
                        ],
                        name: 'SecondObject',
                        isRef: false
                    },
                    {
                        type: MetaType.struct,
                        fields: [
                            {
                                required: true,
                                name: 'thirdObjField',
                                // meta: {
                                //     type: MetaType.primitive,
                                //     primitiveType: PrimitiveType.string
                                // }
                                meta: 'FirstObject'
                            }
                        ],
                        name: 'ThirdObject',
                        isRef: false
                    }
                ]
            }
        ];

        const result = enrichMeta(target, 'test', source);

        const expected = {
            name: 'FirstObject',
            type: MetaType.struct,
            fields: [
                {
                    required: true,
                    name: 'firstObjField',
                    meta: {
                        name: 'SecondObject',
                        type: MetaType.struct,
                        fields: [
                            {
                                required: true,
                                name: 'secondObjField',
                                meta: 'FirstObject'
                            }
                        ],
                        isRef: false
                    }
                }
            ],
            isRef: false
        };
        // expected.fields[0].meta.fields[0].meta = expected;

        console.log('Result', result);
        expect(result).toEqual(expected);
    });
});
