import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as uuid from 'uuid/v4';

import { QuestionaryData } from '../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../thrift-services/damsel/gen-model/claim_management';
import { createContractCreation, createPayoutToolCreation, createShopCreation } from './creators';
import { createContractor } from './creators/create-contractor';
import { createShopAccountCreation } from './creators/create-shop-account-creation';
import { ExtractFormValue } from './extract-form-value';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Observable, Subject } from 'rxjs';
// import { filter, switchMap } from 'rxjs/operators';
//
// import { Questionary } from '../thrift-services/ank/gen-model/questionary_manager';
// import { Modification } from '../thrift-services/damsel/gen-model/claim_management';
// import { PartyID } from '../thrift-services/damsel/gen-model/domain';
// import { PartyModificationsExtractorDialogComponent } from './party-modifications-extractor.component';

@Injectable()
export class PartyModificationsExtractorDialogService {
    form = this.fb.group({
        category: this.fb.group({}),
        payment_institution: this.fb.group({}),
        contractor: this.fb.group({}),
    });

    constructor(private fb: FormBuilder) {}

    mapToModifications(d: QuestionaryData): PartyModification[] {
        const {
            category,
            payment_institution,
            contractor: { id },
        }: ExtractFormValue = this.form.value;
        const contractorID = uuid();
        const shopID = uuid();
        const contractID = uuid();
        const payoutToolID = uuid();

        const result = [];

        if (d.contractor) {
            const contractorCreationModification = createContractor(d, contractorID);
            result.push(contractorCreationModification);
        }

        const contractCreationModification = createContractCreation(
            d.contractor ? contractorID : id,
            contractID,
            payment_institution
        );
        result.push(contractCreationModification);

        const payoutToolCreationModification = createPayoutToolCreation(
            d,
            contractID,
            payoutToolID
        );
        result.push(payoutToolCreationModification);

        const shopCreationModification = createShopCreation(
            d,
            contractID,
            payoutToolID,
            category.id,
            shopID
        );
        const shopAccountCreation = createShopAccountCreation(shopID);
        result.push(shopCreationModification, shopAccountCreation);

        return result;
    }
    // private extract$ = new Subject<{ partyID: PartyID; questionary: Questionary }>();
    //
    // extracted$: Observable<Modification[]> = this.extract$.pipe(
    //     switchMap(
    //         ({ partyID, questionary }) =>
    //             new Observable<Modification[]>((observer) => {
    //                 const dialog = this.dialog
    //                     .open(PartyModificationsExtractorDialogComponent, {
    //                         disableClose: true,
    //                         data: { questionary, partyID },
    //                         width: '800px',
    //                     })
    //
    //                     .afterClosed()
    //                     .pipe(filter((r) => r.length > 0))
    //                     .subscribe((result) => {
    //                         this.snackBar.open('Party modifications extracted successfully', 'OK', {
    //                             duration: 1500,
    //                         });
    //                         observer.next(result.map((item) => ({ party_modification: item })));
    //                     });
    //             })
    //     )
    // );
    //
    // constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}
    //
    // extract(partyID: PartyID, questionary: Questionary) {
    //     this.extract$.next({ partyID, questionary });
    // }
}
