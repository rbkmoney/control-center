import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActionType, UnitAction } from '../claim/unit-action';
import { DomainModificationInfo } from '../claim/model';
import { ClaimService } from '../claim/claim.service';
import { PartyModification } from '../damsel/index';

@Injectable()
export class PartyModificationCreationService {

    domainModificationInfo$: Observable<DomainModificationInfo>;

    constructor(private claimService: ClaimService) {
        this.domainModificationInfo$ = this.claimService.domainModificationInfo$;
    }

    createChange(modification: PartyModification, claimAction: UnitAction): Observable<void> {
        switch (claimAction.type) {
            case ActionType.shopAction:
            case ActionType.contractAction:
                return this.claimService
                    .createChange(modification);
            // case ActionType.domainAction:
            //     return this.domainTypedManager
            //         .createTerminal(value as CreateTerminalParams)
            //         .pipe(map(() => {}));
        }
    }
}
