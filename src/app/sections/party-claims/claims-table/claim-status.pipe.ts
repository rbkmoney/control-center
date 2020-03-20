import { Pipe, PipeTransform } from '@angular/core';

import { ClaimStatus as UnionClaimStatus } from '../../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus } from '../../../papi/model';
import { getUnionKey } from '../../../shared/utils';

const claimStatusByUnionClaimStatus: { [name in keyof UnionClaimStatus]-?: ClaimStatus } = {
    accepted: ClaimStatus.accepted,
    denied: ClaimStatus.denied,
    revoked: ClaimStatus.revoked,
    pending: ClaimStatus.pending,
    review: ClaimStatus.review,
    pending_acceptance: ClaimStatus.pending_acceptance
};

@Pipe({
    name: 'ccClaimStatus'
})
export class ClaimStatusPipe implements PipeTransform {
    transform(status: UnionClaimStatus): ClaimStatus {
        return claimStatusByUnionClaimStatus[getUnionKey(status) as keyof UnionClaimStatus];
    }
}
