import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TimelineAction } from './to-timeline-info/model';
import { ClaimID, Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';

@Injectable()
export class ConversationService {
    constructor(private claimManagementService: ClaimManagementService) {}

    updateConversation(
        party_id: string,
        claim_id: ClaimID,
        action: TimelineAction,
        modification: Modification
    ): Observable<void> {
        return this.claimManagementService
            .getClaim(party_id, claim_id)
            .pipe(
                switchMap(claim =>
                    this.claimManagementService.updateClaim(
                        claim.party_id,
                        claim.id,
                        claim.revision,
                        [modification]
                    )
                )
            );
    }
}
