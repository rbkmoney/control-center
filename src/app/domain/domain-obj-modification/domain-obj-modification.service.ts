import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { DomainObject, Reference } from '../../gen-damsel/domain';
import { MetadataService } from '../metadata.service';
import { DomainService } from '../domain.service';
import { toJson } from '../../shared/thrift-json-converter';
import { extract } from '../../shared/thrift-utils';
import { MonacoFile } from '../../monaco-editor/model';
import { MetaBuilder } from '../../damsel-meta/meta-builder.service';
import { MetaStruct, MetaUnion } from '../../damsel-meta/model';
import { ModificationPayload } from './modification-payload';
import { MetaApplicator } from '../../damsel-meta/meta-applicator.service';

@Injectable()
export class DomainObjModificationService {
    private meta: MetaStruct | MetaUnion;
    private errors$: Subject<string> = new Subject();
    private valueValid$: Subject<boolean> = new BehaviorSubject(false);

    get errors(): Observable<string> {
        return this.errors$;
    }

    get valueValid(): Observable<boolean> {
        return this.valueValid$;
    }

    constructor(
        private route: ActivatedRoute,
        private domainService: DomainService,
        private metadataService: MetadataService,
        private metaBuilder: MetaBuilder,
        private metaApplicator: MetaApplicator
    ) {
        this.metaBuilder.errors.subscribe(e => {
            this.errors$.next(e);
            console.error('Build meta error:', e);
        });
        this.metaApplicator.errors.subscribe(e => console.info('Apply meta error:', e));
    }

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

    applyValue(json: string): MetaStruct | MetaUnion | null {
        if (!this.meta) {
            throw 'Service is not initialized';
        }
        const result = this.metaApplicator.apply(this.meta, json);
        this.valueValid$.next(result.valid);
        return result.payload;
    }

    private buildMeta(objectType, domainObj, namespace) {
        if (!objectType) {
            throw 'Domain object type not found';
        }
        if (!domainObj) {
            throw 'Domain object not found';
        }
        return this.metaBuilder.build(objectType, namespace).pipe(
            tap(({ payload, valid }) => {
                if (!valid) {
                    throw 'Build meta failed';
                }
                this.meta = payload;
            }),
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
