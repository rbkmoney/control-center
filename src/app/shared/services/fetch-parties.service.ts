import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/utils';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { DeanonimusService } from '../../thrift-services/deanonimus';
import { Party } from '../../thrift-services/deanonimus/gen-model/deanonimus';

@Injectable()
export class FetchPartiesService {
    private searchParties$: Subject<string> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
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

    // eslint-disable-next-line @typescript-eslint/member-ordering
    inProgress$: Observable<boolean> = progress(this.searchParties$, this.parties$);

    constructor(private deanonimusService: DeanonimusService) {}

    searchParties(text: string) {
        this.searchParties$.next(text);
    }
}
