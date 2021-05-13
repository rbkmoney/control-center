import cloneDeep from 'lodash-es/cloneDeep';

import { MetaLoopResolver } from './meta-loop-resolver';

describe('MetaLoopResolver', () => {
    it('should resolve loop', () => {
        const predicate = {
            name: 'Predicate',
            fields: [
                {
                    required: false,
                    name: 'all_of',
                    meta: {
                        collectionType: 'set',
                        itemMeta: '$loop_Predicate',
                        type: 'collection',
                    },
                },
            ],
            settedField: null,
            type: 'union',
        } as any;

        const resolver = new MetaLoopResolver([predicate], '$loop_');
        const result = resolver.resolve(predicate);

        const expected = cloneDeep(predicate);
        expected.fields[0].meta.itemMeta = expected;

        expect(result.errors.length).toEqual(0);
        expect(result.resolved).toEqual(expected);
    });

    it('should resolve multi level loops', () => {
        const resolveContainer = [
            {
                name: 'PaymentsProvisionTerms',
                fields: [
                    {
                        meta: '$loop_CurrencySelector',
                        name: 'currencies',
                        required: true,
                    },
                    {
                        meta: '$loop_Predicate',
                        name: 'predicate',
                        required: true,
                    },
                ],
                isRef: false,
                type: 'struct',
            },
            {
                name: 'CurrencySelector',
                fields: [
                    {
                        required: false,
                        name: 'value',
                        meta: {
                            collectionType: 'set',
                            itemMeta: '$loop_CurrencyRef',
                            type: 'collection',
                        },
                    },
                ],
                settedField: null,
                type: 'union',
            },
            {
                name: 'CurrencyRef',
                fields: [
                    {
                        meta: { type: 'primitive', primitiveType: 'string' },
                        name: 'symbolic_code',
                        required: true,
                    },
                ],
                isRef: true,
                type: 'struct',
            },
            {
                name: 'Predicate',
                fields: [
                    {
                        required: false,
                        name: 'all_of',
                        meta: {
                            collectionType: 'set',
                            itemMeta: '$loop_Predicate',
                            type: 'collection',
                        },
                    },
                ],
                settedField: null,
                type: 'union',
            },
        ] as any;

        const resolver = new MetaLoopResolver(resolveContainer, '$loop_');
        const result = resolver.resolve(resolveContainer[0]);
        // eslint-disable-next-line no-console
        console.log('result', result.resolved);
    });
});
