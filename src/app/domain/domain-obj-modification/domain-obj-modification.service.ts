import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { DomainObject, Reference } from '../../gen-damsel/domain';
import { MetadataService } from '../metadata.service';
import { DomainService } from '../domain.service';
import { toJson } from '../../shared/thrift-json-converter';
import { extract } from '../../shared/thrift-utils';
import { MonacoFile } from '../../monaco-editor/model';
import { MetaBuilderService } from '../../damsel-meta/meta-builder.service';
import { MetaStruct, MetaUnion } from '../../damsel-meta/model';
import { ModificationPayload } from './modification-payload';

@Injectable()
export class DomainObjModificationService {
    private meta: MetaStruct | MetaUnion;

    constructor(
        private route: ActivatedRoute,
        private domainService: DomainService,
        private metadataService: MetadataService,
        private metaBuilderService: MetaBuilderService
    ) {}

    initialize(namespace = 'domain'): Observable<ModificationPayload> {
        return this.route.params.pipe(
            map(({ ref }) => this.parseParams(ref)),
            switchMap(ref =>
                combineLatest(
                    this.metadataService.getDomainObjectType(ref),
                    this.domainService.getDomainObject(ref)
                )
            ),
            switchMap(([objectType, domainObj]) => this.buildMeta(objectType, domainObj, namespace))
        );
    }

    applyValue(json: string): MetaStruct | MetaUnion {
        if (!this.meta) {
            throw 'Service is not initialized';
        }
        return this.metaBuilderService.applyValue(this.meta, json);
    }

    private buildMeta(objectType, domainObj, namespace) {
        if (!objectType) {
            throw 'Domain object type not found';
        }
        if (!domainObj) {
            throw 'Domain object not found';
        }
        return this.metaBuilderService.buildMeta(objectType, namespace).pipe(
            tap(meta => (this.meta = meta)),
            map(() => ({
                file: this.toMonacoFile(domainObj),
                objectType
            }))
        );
    }

    private parseParams(ref: string): Reference {
        try {
            return JSON.parse(ref);
        } catch {
            throw 'Malformed domain object ref';
        }
    }

    private toMonacoFile(domainObj: DomainObject | null): MonacoFile {
        return {
            uri: 'index.json',
            language: 'json',
            content: JSON.stringify(toJson(extract(domainObj)), null, 2)
        };
    }
}
