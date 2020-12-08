import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { PartiesSearchFiltersParams } from '../../sections/search-parties/parties-search-filters';
import { DeanonimusService } from '../../thrift-services/deanonimus';
import { SearchHit } from '../../thrift-services/deanonimus/gen-model/deanonimus';

@Injectable()
export class FetchPartiesService {
    private searchParties$: Subject<PartiesSearchFiltersParams> = new Subject();
    private hasError$: Subject<any> = new Subject();

    parties$ = this.searchParties$.pipe(
        switchMap((params) =>
            this.deanonimusService.searchParty(params).pipe(
                catchError((_) => {
                    this.hasError$.next();
                    return of('error');
                })
            )
        ),
        filter((r) => r !== 'error'),
        map((hits: SearchHit[]) => hits.map((hit) => hit.party)),
        shareReplay(1)
    );

    inProgress$ = progress(this.searchParties$, merge(this.parties$, this.hasError$));

    constructor(private deanonimusService: DeanonimusService) {}

    searchParties(params: PartiesSearchFiltersParams) {
        this.searchParties$.next(params);
    }
}
