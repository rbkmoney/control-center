import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/index';

import { ClaimService as ClaimPapi } from '../backend/claim.service';
import { ClaimInfo } from '../backend/model';
import { ClaimInfoContainer } from './model';
import { PartyModification } from '../backend/model/damsel';
import { PartyModificationContainerConverter } from './party-modification-container-converter';

@Injectable()
export class ClaimService {

    $claimInfoContainer: Subject<ClaimInfoContainer> = new Subject();

    private claimInfoContainer: ClaimInfoContainer;

    constructor(private papiClaimService: ClaimPapi,
                private route: ActivatedRoute) {
        this.route.params.subscribe((params) =>
            this.resolveClaimInfo(params.partyId, params.claimId));
    }

    private resolveClaimInfo(partyId: string, claimId: string) {
        this.papiClaimService.getClaim(partyId, claimId).subscribe((claimInfo) => {
            this.claimInfoContainer = this.toClaimInfoContainer(claimInfo);
            this.$claimInfoContainer.next(this.claimInfoContainer);
        });
    }

    private toClaimInfoContainer(claimInfo: ClaimInfo): ClaimInfoContainer {
        const modifications = claimInfo.modifications.modifications;
        const ids = this.findIds(modifications);
        return {
            claimId: claimInfo.claimId,
            partyId: claimInfo.partyId,
            revision: claimInfo.revision,
            status: claimInfo.status,
            reason: claimInfo.reason,
            createdAt: claimInfo.createdAt,
            updatedAt: claimInfo.updatedAt,
            partyModificationUnits: PartyModificationContainerConverter.convert(modifications),
            ...ids
        };
    }

    private findIds(modifications: PartyModification[]): { shopId: string, contractId: string } {
        return modifications.reduce((prev, current) => {
            if (!prev.shopId && current.shopModification) {
                const shopId = current.shopModification.id;
                return {...prev, shopId};
            } else if (!prev.contractId && current.contractModification) {
                const contractId = current.contractModification.id;
                return {...prev, contractId};
            } else {
                return prev;
            }
        }, {shopId: null, contractId: null});
    }
}
