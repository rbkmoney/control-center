import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, Subject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DomainObject, Reference } from '../../thrift-services/damsel/gen-model/domain';
import { MetadataService } from '../metadata.service';
import { DomainService } from '../domain.service';
import { MetaBuilder } from '../../damsel-meta/meta-builder.service';
import { MetaApplicator } from '../../damsel-meta/meta-applicator.service';
import { toMonacoContent, parseRef } from '../utils';
import { DomainReviewService } from '../domain-review.service';
import { DomainModificationModel, ModificationItem } from '../domain-modification-model';
import { ThriftBuilderService } from '../../damsel-meta/thrift-builder.service';
import { getThriftInstance } from '../../thrift-services';
import { ThriftType } from '../../damsel-meta/thrift-builder';

@Injectable()
export class DomainObjModificationService {
    private errors$: Subject<string> = new Subject();

    get errors(): Observable<string> {
        return this.errors$;
    }

    constructor(
        private route: ActivatedRoute,
        private domainService: DomainService,
        private metadataService: MetadataService,
        private metaBuilder: MetaBuilder,
        private metaApplicator: MetaApplicator,
        private domainReviewService: DomainReviewService,
        private thriftBuilderService: ThriftBuilderService
    ) {
        this.metaBuilder.errors.subscribe(e => {
            this.errors$.next(e);
            console.error('Build meta error:', e);
        });
        this.metaApplicator.errors.subscribe(e => console.log('Apply meta error:', e));
    }

    init(namespace = 'domain'): Observable<DomainModificationModel> {
        return combineLatest(this.route.params, this.domainReviewService.reviewModel).pipe(
            switchMap(([routeParams, model]) => {
                if (model && JSON.stringify(model.ref) === routeParams.ref) {
                    return of(model);
                }
                const ref = parseRef(routeParams.ref);
                return combineLatest(
                    this.metadataService.getDomainObjectType(ref),
                    this.domainService.getDomainObject(ref)
                ).pipe(
                    switchMap(([objectType, domainObj]) =>
                        this.build(ref, objectType, domainObj, namespace)
                    )
                );
            })
        );
    }

    modify(original: ModificationItem, modifiedContent: string): ModificationItem | null {
        const modifiedMeta = this.metaApplicator.apply(original.meta, modifiedContent);
        if (!modifiedMeta) {
            return;
        }
        const thrift = this.thriftBuilderService.build(modifiedMeta);
        if (!thrift) {
            return;
        }
        return {
            meta: modifiedMeta,
            domainObj: this.formNewDomainObj(original.domainObj, thrift),
            monacoContent: modifiedContent
        };
    }

    reset({ monacoContent }: ModificationItem): Partial<ModificationItem> {
        return {
            monacoContent: monacoContent.slice()
        };
    }

    private build(
        ref: Reference,
        objectType: string,
        domainObj: DomainObject,
        namespace: string
    ): Observable<DomainModificationModel> {
        if (!objectType) {
            throw new Error('Domain object type not found');
        }
        if (!domainObj) {
            throw new Error('Domain object not found');
        }
        return this.metaBuilder.build(objectType, namespace).pipe(
            map(initialMeta => {
                if (!initialMeta) {
                    throw new Error('Build initial meta failed');
                }
                const monacoContent = toMonacoContent(domainObj);
                const applied = this.metaApplicator.apply(initialMeta, monacoContent);
                if (!applied) {
                    throw new Error('Apply original value failed');
                }
                return {
                    ref,
                    objectType,
                    original: {
                        monacoContent,
                        domainObj,
                        meta: applied
                    },
                    modified: {
                        monacoContent: monacoContent.slice()
                    }
                };
            })
        );
    }

    private formNewDomainObj(source: DomainObject, thrift: ThriftType): DomainObject {
        const result = getThriftInstance('domain', 'DomainObject');
        const filtered = Object.keys(source).filter(k => !!source[k]);
        if (filtered.length !== 1) {
            throw new Error('Should be only one field in DomainObject');
        }
        result[filtered[0]] = thrift;
        return result;
    }
}
