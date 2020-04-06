import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { DomainModificationModel } from './domain-modification-model';

@Injectable()
export class DomainReviewService {
    private reviewModel$: Subject<DomainModificationModel> = new BehaviorSubject(null);

    get reviewModel(): Observable<DomainModificationModel> {
        return this.reviewModel$;
    }

    addReviewModel(model: DomainModificationModel) {
        if (!model) {
            return;
        }
        this.reviewModel$.next(model);
    }

    resetModel() {
        this.reviewModel$.next(null);
    }
}
