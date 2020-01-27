import { Pipe, PipeTransform } from '@angular/core';

import { extractClaimStatus } from '../extract-claim-status';

@Pipe({
    name: 'ccClaimStatus'
})
export class ClaimStatusPipe implements PipeTransform {
    transform(value: any): string {
        return extractClaimStatus(value);
    }
}
