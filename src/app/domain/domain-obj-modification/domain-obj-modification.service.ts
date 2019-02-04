import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Reference, DomainObject } from '../../gen-damsel/domain';
import { ModificationPayload } from './modification-payload';
import { MetadataService } from '../metadata.service';
import { DomainService } from '../domain.service';
import { toJson } from '../../shared/thrift-json-converter';
import { extract } from '../../shared/thrift-utils';
import { MonacoFile } from '../../monaco-editor/model';

@Injectable()
export class DomainObjModificationService {
    constructor(private domainService: DomainService, private metadataService: MetadataService) {}

    initialize(ref: Reference): Observable<ModificationPayload> {
        return combineLatest(
            this.domainService.getDomainObject(ref),
            this.metadataService.getDomainObjectType(ref)
        ).pipe(
            map(([domainObj, objectType]) => ({
                objectType,
                file: this.toMonacoFile(domainObj)
            }))
        );
    }

    private toMonacoFile(domainObj: DomainObject | null): MonacoFile {
        if (!domainObj) {
            return null;
        }
        return {
            uri: 'index.json',
            language: 'json',
            content: JSON.stringify(toJson(extract(domainObj)), null, 2)
        };
    }
}
