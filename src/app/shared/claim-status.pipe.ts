import { Pipe, PipeTransform } from '@angular/core';

import { ClaimStatus } from '../papi/model/claim-statuses';

@Pipe({
    name: 'ccClaimStatus'
})
export class ClaimStatusPipe implements PipeTransform {
    public transform(status: string): string {
        let result = status;
        switch (ClaimStatus[status]) {
            case ClaimStatus.accepted:
                result = 'Одобрена';
                break;
            case ClaimStatus.denied:
                result = 'Отклонена';
                break;
            case ClaimStatus.revoked:
                result = 'Отменена';
                break;
            case ClaimStatus.pending:
                result = 'В ожидании';
                break;
            default:
                break;
        }
        return result;
    }
}
