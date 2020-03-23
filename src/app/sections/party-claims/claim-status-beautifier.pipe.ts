import { Pipe, PipeTransform } from '@angular/core';

import { ClaimStatus } from '../../papi/model';

@Pipe({
    name: 'ccClaimStatusBeautifier'
})
export class ClaimStatusBeautifierPipe implements PipeTransform {
    transform(status: ClaimStatus | string): string {
        switch (status) {
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
