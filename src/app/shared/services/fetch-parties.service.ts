import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { DeanonimusService } from '../../thrift-services/deanonimus';
import { Party } from '../../thrift-services/deanonimus/gen-model/deanonimus';

@Injectable()
export class FetchPartiesService {
    private searchParties$: Subject<string> = new Subject();

    parties$: Observable<Party[]> = this.searchParties$.pipe(
        switchMap((text) =>
            this.deanonimusService.searchParty(text).pipe(
                map((hits) => hits.map((hit) => hit.party)),
                catchError((err) => {
                    console.error(err);
                    return of([]);
                })
            )
        ),
        shareReplay(1)
    );

    inProgress$: Observable<boolean> = progress(this.searchParties$, this.parties$);

    constructor(private deanonimusService: DeanonimusService) {}

    searchParties(text: string) {
        this.searchParties$.next(text);
    }
}
