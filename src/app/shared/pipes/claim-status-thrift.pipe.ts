import { Pipe, PipeTransform } from '@angular/core';

import { extractClaimStatus } from '../extract-claim-status';
import { ClaimStatus as UnionClaimStatus } from '../../thrift-services/damsel/gen-model/claim_management';

@Pipe({
    name: 'ccClaimStatusThrift'
})
export class ClaimStatusThriftPipe implements PipeTransform {
    transform(value: UnionClaimStatus): string {
        return extractClaimStatus(value);
    }
}
