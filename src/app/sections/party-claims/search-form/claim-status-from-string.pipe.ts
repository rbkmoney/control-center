import { Pipe, PipeTransform } from '@angular/core';
import { ClaimStatus } from '../../../papi/model';

@Pipe({
    name: 'ccClaimStatusFromString'
})
export class ClaimStatusFromStringPipe implements PipeTransform {
    transform(s: string): string {
        switch (s) {
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
