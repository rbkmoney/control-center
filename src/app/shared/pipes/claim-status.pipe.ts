import { Pipe, PipeTransform } from '@angular/core';

import { extractClaimStatus } from '../extract-claim-status';
import { ClaimStatus as UnionClaimStatus } from '../../thrift-services/damsel/gen-model/claim_management';
import { ClaimStatus } from '../../papi/model';

@Pipe({
    name: 'ccClaimStatus'
})
export class ClaimStatusPipe implements PipeTransform {
    transform(value: UnionClaimStatus): ClaimStatus {
        return extractClaimStatus(value);
    }
}
