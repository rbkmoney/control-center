import { Pipe, PipeTransform } from '@angular/core';

import { extractClaimStatus } from '../extract-claim-status';
import { ClaimStatus as UnionClaimStatus } from '../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus } from '../../papi/model';

@Pipe({
    name: 'ccClaimStatus'
})
export class ClaimStatusPipe implements PipeTransform {
    transform(value: UnionClaimStatus): string {
        switch (extractClaimStatus(value)) {
            case ClaimStatus.review:
                return 'Review';
            case ClaimStatus.revoked:
                return 'Revoked';
            case ClaimStatus.denied:
                return 'Denied';
            case ClaimStatus.pending_acceptance:
                return 'Pending Acceptance';
            case ClaimStatus.pending:
                return 'Pending';
            case ClaimStatus.accepted:
                return 'Accepted';
            default:
                return status;
        }
    }
}
