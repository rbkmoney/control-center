import { MetadataService, Type } from './metadata.service';
import domainTestData from './domain-test-data.json';

describe('MetadataService', () => {
    let metadataService: MetadataService;
    let metadata: Type;
    let initValue: any;

    beforeEach(() => {
        metadataService = new MetadataService();
        metadata = metadataService.get('Domain', 'domain');
        initValue = metadata.toThrift(domainTestData);
    });

    describe('isEqualValue', () => {
        it('equal', async () => {
            expect(MetadataService.isEqualValue(initValue, initValue)).toBeTruthy();
        });
    });
});
