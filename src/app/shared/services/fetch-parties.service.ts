import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { DeanonimusService } from '../../thrift-services/deanonimus';

@Injectable()
export class FetchPartiesService {
    private searchParties$: Subject<string> = new Subject();
    private hasError$: Subject<any> = new Subject();

    parties$ = this.searchParties$.pipe(
        switchMap((text) =>
            this.deanonimusService.searchParty(text).pipe(
                map((hits) => hits.map((hit) => hit.party)),
                catchError((err) => {
                    console.error(err);
                    this.hasError$.next();
                    return of('error');
                })
            )
        ),
        filter((r) => r !== 'error'),
        shareReplay(1)
    );

    inProgress$ = progress(this.searchParties$, merge(this.parties$, this.hasError$));

    constructor(private deanonimusService: DeanonimusService) {}

    searchParties(text: string) {
        this.searchParties$.next(text);
    }
}
