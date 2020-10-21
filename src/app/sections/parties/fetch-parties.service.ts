import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { of, Subject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PartiesSearchFiltersParams } from '@cc/app/shared/components';

import { DeanonimusService } from '../../thrift-services/deanonimus';

@Injectable()
export class FetchPartiesService {
    private searchParties$: Subject<PartiesSearchFiltersParams> = new Subject();
    private hasError$: Subject<any> = new Subject();

    parties$ = this.searchParties$.pipe(
        switchMap((params) =>
            this.deanonimusService.searchParty(params).pipe(
                catchError((_) => {
                    this.hasError$.next();
                    return of();
                })
            )
        ),
        map((hits) => {
            console.log(hits);
            return hits;
        })
    );
    isLoading$ = progress(this.searchParties$, this.parties$);

    constructor(private deanonimusService: DeanonimusService) {}

    search(params: PartiesSearchFiltersParams) {
        this.searchParties$.next(params);
    }
}
