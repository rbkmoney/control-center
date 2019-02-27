import { enrichMeta } from './enrich-meta';
import { MetaType } from '../../model';

fdescribe('enrichMeta', () => {
    it('should enrich circular dependency', () => {
        const target = {
            name: 'Object_1',
            fields: [
                {
                    name: 'field_11',
                    meta: 'Object_2',
                    required: true
                }
            ],
            type: MetaType.struct,
            isRef: false
        };

        const source = [
            {
                namespace: 'test',
                meta: [
                    target,
                    {
                        name: 'Object_2',
                        fields: [
                            {
                                required: true,
                                name: 'field_21',
                                meta: 'Object_1'
                            }
                        ],
                        type: MetaType.struct,
                        isRef: false
                    }
                ]
            }
        ];

        const result = enrichMeta(target, 'test', source);

        const expected = {
            name: 'Object_1',
            fields: [
                {
                    name: 'field_11',
                    meta: {
                        name: 'Object_2',
                        fields: [
                            {
                                name: 'field_21',
                                meta: '$circular_Object_1',
                                required: true
                            }
                        ],
                        type: MetaType.struct,
                        isRef: false
                    },
                    required: true
                }
            ],
            type: MetaType.struct,
            isRef: false
        };
        
        ((expected as any).fields[0].meta.fields[0].meta = expected); // Resolve refs

        console.log('Result', result);
        expect(result).toEqual(expected);
    });
});
