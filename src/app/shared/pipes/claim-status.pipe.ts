import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccClaimStatus',
})
export class ClaimStatusPipe implements PipeTransform {
    transform(value: string) {
        switch (value) {
            case 'accepted':
                return 'Accepted';
            case 'denied':
                return 'Denied';
            case 'revoked':
                return 'Revoked';
            case 'pending':
                return 'Pending';
            case 'review':
                return 'Review';
            case 'pending_acceptance':
                return 'Pending Acceptance';
        }
    }
}
