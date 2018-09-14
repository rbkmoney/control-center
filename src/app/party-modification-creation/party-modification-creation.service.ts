import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActionType, UnitAction } from '../claim/unit-action';
import { DomainModificationInfo } from '../claim/model';
import { ClaimService } from '../claim/claim.service';
import { PartyModification } from '../damsel/index';
import { CreateTerminalParams, DomainTypedManager } from '../domain/domain-typed-manager';

@Injectable()
export class PartyModificationCreationService {

    domainModificationInfo$: Observable<DomainModificationInfo>;

    constructor(private claimService: ClaimService,
                private domainTypedManager: DomainTypedManager) {
        this.domainModificationInfo$ = this.claimService.domainModificationInfo$;
    }

    createChange(values: PartyModification | CreateTerminalParams, claimAction: UnitAction): Observable<void> {
        switch (claimAction.type) {
            case ActionType.shopAction:
            case ActionType.contractAction:
                return this.claimService
                    .createChange(values as PartyModification);
            case ActionType.domainAction:
                return this.domainTypedManager
                    .createTerminal(values as CreateTerminalParams)
                    .pipe(map(() => {}));
        }
    }
}
