import * as uuid from 'uuid/v4';

import { Reference, DomainObject } from '../gen-damsel/domain';
import { MonacoFile } from '../monaco-editor';
import { toJson } from '../shared/thrift-json-converter';
import { extract } from '../shared/thrift-utils';

export function parseRef(ref: string): Reference {
    try {
        return JSON.parse(ref);
    } catch {
        throw new Error('Malformed domain object ref');
    }
}

export const toMonacoFile = (content: string): MonacoFile => ({
    uri: `${uuid()}.json`,
    language: 'json',
    content
});

export const toMonacoContent = (domainObj: DomainObject): string =>
    JSON.stringify(toJson(extract(domainObj)), null, 2);
