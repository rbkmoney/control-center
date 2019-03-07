import cloneDeep from 'lodash-es/cloneDeep';

import { MetaLoopResolver } from './meta-loop-resolver';

describe('MetaLoopResolver', () => {
    it('should resolve loop set', () => {
        const predicate = {
            name: 'Predicate',
            fields: [
                {
                    required: false,
                    name: 'all_of',
                    meta: {
                        collectionType: 'set',
                        itemMeta: '$loop_Predicate',
                        type: 'collection'
                    }
                }
            ],
            settedField: null,
            type: 'union'
        } as any;

        const resolver = new MetaLoopResolver([predicate], '$loop_');
        const result = resolver.resolve(predicate);

        const expected = cloneDeep(predicate);
        (expected.fields[0].meta.itemMeta as any) = expected;

        expect(result).toEqual(expected);
    });
});
