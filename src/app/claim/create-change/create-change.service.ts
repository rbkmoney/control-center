import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActionType, UnitAction } from '../unit-action';
import { DomainModificationInfo } from '../model';
import { ClaimService } from '../claim.service';
import { PartyModification } from '../../damsel';

@Injectable()
export class CreateChangeService {

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
