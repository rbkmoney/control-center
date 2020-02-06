import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, forkJoin, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { PartyModification } from '../../../thrift-services/damsel/gen-model/payment_processing';

type PartyModificationPosition = number;

@Injectable()
export class UnsavedPartyModificationService {
    private unsaved$: BehaviorSubject<PartyModification[]> = new BehaviorSubject([]);
    private remove$: Subject<PartyModificationPosition> = new Subject();

    unsavedPartyModifications$: Observable<PartyModification[]> = this.unsaved$.asObservable();

    constructor() {
        this.remove$
            .pipe(
                switchMap(pos => forkJoin(of(pos), this.unsaved$.pipe(first()))),
                map(([pos, modifications]) => modifications.filter((_, i) => pos !== i))
            )
            .subscribe(modifications => this.unsaved$.next(modifications));
    }

    setUpUnsaved(modifications: PartyModification[]) {
        this.unsaved$.next(modifications);
    }

    remove(pos: PartyModificationPosition) {
        this.remove$.next(pos);
    }
}
