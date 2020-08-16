import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { AnkService } from '../../../../thrift-services/ank/ank.service';
import {
    Questionary,
    QuestionaryID,
} from '../../../../thrift-services/ank/gen-model/questionary_manager';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class QuestionaryTimelineItemService {
    private getQuestionaryData$ = new Subject<{ questionaryID: QuestionaryID; partyID: PartyID }>();
    private hasError$ = new Subject();

    questionaryData$: Observable<Questionary> = this.getQuestionaryData$.pipe(
        switchMap(({ questionaryID, partyID }) =>
            this.ankService.get(questionaryID, partyID).pipe(
                catchError((e) => {
                    this.hasError$.next(e);
                    return of(e);
                })
            )
        ),
        pluck('questionary'),
        shareReplay(1)
    );

    error$ = this.hasError$.asObservable();

    isLoading$ = progress(this.getQuestionaryData$, merge(this.questionaryData$, this.hasError$));

    constructor(private ankService: AnkService) {
        this.questionaryData$.subscribe();
    }

    getQuestionaryData(questionaryID: QuestionaryID, partyID: PartyID) {
        this.getQuestionaryData$.next({ questionaryID, partyID });
    }
}
