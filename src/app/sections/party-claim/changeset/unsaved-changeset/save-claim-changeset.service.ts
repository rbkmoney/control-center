import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { ClaimManagementService } from '../../../../thrift-services/damsel/claim-management.service';
import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class SaveClaimChangesetService {
    constructor(
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {}

    instantSave(partyID: PartyID, claimID: string, mod: Modification) {
        return new Observable((observer) => {
            this.claimManagementService
                .updateClaim(partyID, new Int64(parseInt(claimID, 10)), [mod])
                .pipe(catchError((e) => this.handleError(e)))
                .subscribe((e) => {
                    if (e) {
                        observer.error('error');
                    }
                    observer.next();
                    observer.complete();
                });
        });
    }

    save(partyID: PartyID, claimID: string, mods: Modification[]) {
        return new Observable((observer) => {
            if (mods.length === 0) {
                observer.error('error');
            }
            this.claimManagementService
                .updateClaim(partyID, new Int64(parseInt(claimID, 10)), mods)
                .pipe(catchError((e) => this.handleError(e)))
                .subscribe((e) => {
                    if (e) {
                        observer.error('error');
                    }
                    observer.next();
                    observer.complete();
                });
        });
    }

    private handleError(e: any) {
        this.snackBar.open('An error occurred while saving new modification', 'OK');
        console.error(e);
        return of('error');
    }
}
