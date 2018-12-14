import { createNode, Node } from '.';
import { MetadataService, Type } from '../../../metadata/metadata.service';
import domainTestData from './domain-test-data.json';

describe('Node', () => {
    let metadataService: MetadataService;
    let node: Node;
    let metadata: Type;

    beforeEach(() => {
        metadataService = new MetadataService();
        metadata = metadataService.get('Domain', 'domain');
        node = createNode({metadata, initValue: metadata.toThrift(domainTestData)});
    });

    it('init value equal exported value', async () => {
        expect(MetadataService.isEqualValue(node.initValue, node.thrift)).toBeTruthy();
    });
});
