import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, Subject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import cloneDeep from 'lodash-es/cloneDeep';

import { DomainObject, Reference } from '../../gen-damsel/domain';
import { MetadataService } from '../metadata.service';
import { DomainService } from '../domain.service';
import { MetaBuilder } from '../../damsel-meta/meta-builder.service';
import { MetaStruct, MetaUnion, MetaPayload } from '../../damsel-meta/model';
import { MetaApplicator } from '../../damsel-meta/meta-applicator.service';
import { toMonacoContent, parseRef } from '../utils';
import { DomainReviewService } from '../domain-review.service';
import { DomainModificationModel } from '../domain-modification-model';

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
        private domainReviewService: DomainReviewService
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

    applyValue(meta: MetaStruct | MetaUnion, json: string): MetaPayload {
        return this.metaApplicator.apply(meta, json);
    }

    reset(model: DomainModificationModel): DomainModificationModel {
        model.modified = cloneDeep(model.original);
        return model;
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
            map(({ payload, valid }) => {
                if (!valid) {
                    throw new Error('Build initial meta failed');
                }
                const monacoContent = toMonacoContent(domainObj);
                const applyResult = this.metaApplicator.apply(payload, monacoContent);
                if (!applyResult.valid) {
                    throw new Error('Apply original value failed');
                }
                const reviewItem = {
                    monacoContent,
                    meta: applyResult.payload
                };
                return {
                    ref,
                    original: cloneDeep(reviewItem),
                    modified: reviewItem,
                    objectType
                };
            })
        );
    }
}
