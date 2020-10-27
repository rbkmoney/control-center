import * as uuid from 'uuid/v4';

import { toJson } from '@cc/utils/thrift-json-converter';
import { extract } from '@cc/utils/thrift-utils';

import { MonacoFile } from '../monaco-editor';
import { DomainObject, Reference } from '../thrift-services/damsel/gen-model/domain';

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
    content,
});

export const toMonacoContent = (domainObj: DomainObject): string =>
    JSON.stringify(toJson(extract(domainObj)), null, 2);
