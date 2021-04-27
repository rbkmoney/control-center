import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';

import { PartyModification } from '../../../thrift-services/damsel/gen-model/payment_processing';
import { EditUnsavedModificationComponent } from '../conversation/edit-unsaved-modification/edit-unsaved-modification.component';

type PartyModificationPosition = number;

@Injectable()
export class UnsavedPartyModificationService {
    private unsaved$: BehaviorSubject<PartyModification[]> = new BehaviorSubject([]);
    private remove$: Subject<PartyModificationPosition> = new Subject();
    private edit$: Subject<PartyModificationPosition> = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    unsavedPartyModifications$: Observable<PartyModification[]> = this.unsaved$.asObservable();

    constructor(private dialog: MatDialog) {
        this.remove$
            .pipe(
                switchMap((pos) => forkJoin([of(pos), this.unsaved$.pipe(first())])),
                map(([pos, modifications]) => modifications.filter((_, i) => pos !== i))
            )
            .subscribe((modifications) => this.unsaved$.next(modifications));

        this.edit$
            .pipe(
                switchMap((pos) => forkJoin([of(pos), this.unsaved$.pipe(first())])),
                switchMap(([pos, mods]) => {
                    const d = this.dialog.open(EditUnsavedModificationComponent, {
                        disableClose: true,
                        data: mods[pos],
                    });
                    return forkJoin([of(mods), of(pos), d.afterClosed()]);
                }),
                filter(([, , newMod]) => !!newMod)
            )
            .subscribe(([mods, pos, newMod]) => {
                mods[pos] = newMod;
                this.setUpUnsaved(mods);
            });
    }

    setUpUnsaved(modifications: PartyModification[]) {
        this.unsaved$.next(modifications);
    }

    remove(pos: PartyModificationPosition) {
        this.remove$.next(pos);
    }

    edit(pos: number) {
        this.edit$.next(pos);
    }
}
