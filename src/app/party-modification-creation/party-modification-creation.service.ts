import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActionType, ModificationAction } from '../claim/modification-action';
import { ClaimService } from '../claim/claim.service';
import { PartyModification } from '../damsel';
import { CreateTerminalParams } from '../domain/domain-typed-manager';

@Injectable()
export class PartyModificationCreationService {

    constructor(private claimService: ClaimService) {
    }

    createChange(values: PartyModification | CreateTerminalParams, claimAction: ModificationAction): Observable<void> {
        switch (claimAction.type) {
            case ActionType.shopAction:
            case ActionType.contractAction:
                return this.claimService
                    .createChange(values as PartyModification);
        }
    }
}
