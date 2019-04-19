import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { DomainModificationModel } from './domain-modification-model';

@Injectable()
export class DomainReviewService {
    private reviewModel$: Subject<DomainModificationModel> = new BehaviorSubject(null);

    get reviewModel(): Observable<DomainModificationModel> {
        return this.reviewModel$;
    }

    addReviewModel(model: DomainModificationModel) {
        this.reviewModel$.next(model);
    }
}
