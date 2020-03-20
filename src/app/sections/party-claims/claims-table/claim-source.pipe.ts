import { Pipe, PipeTransform } from '@angular/core';

import { Claim } from '../../../thrift-services/damsel/gen-model/claim_management';

@Pipe({
    name: 'ccClaimSource'
})
export class ClaimSourcePipe implements PipeTransform {
    transform(claim: Claim): string {
        return claim.changeset[0].user_info.type.external_user ? 'Dashboard' : 'Control Center';
    }
}
