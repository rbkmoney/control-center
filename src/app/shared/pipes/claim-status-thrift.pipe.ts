import { Pipe, PipeTransform } from '@angular/core';

import { ClaimStatus as UnionClaimStatus } from '../../thrift-services/damsel/gen-model/claim_management';
import { extractClaimStatus } from '../utils/extract-claim-status';

@Pipe({
    name: 'ccClaimStatusThrift',
})
export class ClaimStatusThriftPipe implements PipeTransform {
    transform(value: UnionClaimStatus): string {
        return extractClaimStatus(value);
    }
}
