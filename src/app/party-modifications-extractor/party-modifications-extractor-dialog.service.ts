import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { Questionary } from '../thrift-services/ank/gen-model/questionary_manager';
import { Modification } from '../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../thrift-services/damsel/gen-model/domain';
import { PartyModificationsExtractorComponent } from './party-modifications-extractor.component';

@Injectable()
export class PartyModificationsExtractorDialogService {
    private extract$ = new Subject<{ partyID: PartyID; questionary: Questionary }>();

    extracted$: Observable<Modification[]> = this.extract$.pipe(
        switchMap(
            ({ partyID, questionary }) =>
                new Observable<Modification[]>((observer) => {
                    const dialog = this.dialog.open(PartyModificationsExtractorComponent, {
                        disableClose: true,
                        data: { questionary, partyID },
                        width: '800px',
                    });
                    dialog
                        .afterClosed()
                        .pipe(filter((r) => r.length > 0))
                        .subscribe((result) => {
                            this.snackBar.open('Party modifications extracted successfully', 'OK', {
                                duration: 1500,
                            });
                            observer.next(result.map((item) => ({ party_modification: item })));
                        });
                })
        )
    );

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

    extract(partyID: PartyID, questionary: Questionary) {
        this.extract$.next({ partyID, questionary });
    }
}
