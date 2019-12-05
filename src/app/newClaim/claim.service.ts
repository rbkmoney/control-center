import { Injectable } from '@angular/core';
import { ClaimManagementService } from '../thrift/claim-management.service';
import { Subject } from 'rxjs';
import { Claim } from '../gen-damsel/claim_management';

@Injectable()
export class ClaimService {
    claim$: Subject<Claim> = new Subject();

    constructor(private claimManagementService: ClaimManagementService) {}

    getClaim(partyID: string, claimID: number) {
        this.claimManagementService
            .getClaim(partyID, claimID)
            .subscribe(claim => this.claim$.next(claim));
    }
}
