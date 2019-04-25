import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

import { DomainModificationModel } from '../domain-modification-model';
import { DomainService } from '../domain.service';
import { Version } from '../../gen-damsel/domain_config';
import { DomainReviewService } from '../domain-review.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class DomainObjReviewService {
    constructor(
        private route: ActivatedRoute,
        private domainService: DomainService,
        private domainReviewService: DomainReviewService
    ) {}

    commit({ original, modified }: DomainModificationModel): Observable<Version> {
        const commit = {
            ops: [
                {
                    update: {
                        old_object: original.domainObj,
                        new_object: modified.domainObj
                    }
                }
            ]
        };
        return this.domainService
            .commit(commit)
            .pipe(tap(() => this.domainReviewService.resetModel()));
    }

    initialize() {
        return combineLatest(this.route.params, this.domainReviewService.reviewModel);
    }
}
