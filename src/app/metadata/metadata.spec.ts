import { MetadataService, Type } from './metadata.service';
import domainTestData from './domain-test-data.json';
import domainTestDataChanged from './domain-test-data-changed.json';

describe('MetadataService', () => {
    let metadataService: MetadataService;
    let metadata: Type;
    let initValue: any;
    let initValueEqual: any;
    let initValueChanged: any;

    beforeEach(() => {
        metadataService = new MetadataService();
        metadata = metadataService.get('Domain', 'domain');
        initValue = metadata.toThrift(domainTestData);
        initValueEqual = metadata.toThrift(domainTestData);
        initValueChanged = metadata.toThrift(domainTestDataChanged);
    });

    describe('isEqualValue', () => {
        it('equal', async () => {
            expect(MetadataService.isEqualValue(initValue, initValueEqual)).toBeTruthy();
        });

        it('is not equal', async () => {
            expect(MetadataService.isEqualValue(initValue, initValueChanged)).toBeFalsy();
        });
    });
});
