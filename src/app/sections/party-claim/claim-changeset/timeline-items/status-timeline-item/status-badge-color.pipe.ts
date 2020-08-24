import { Pipe, PipeTransform } from '@angular/core';

import { getUnionKey } from '../../../../../shared/utils';
import { ClaimStatus } from '../../../../../thrift-services/damsel/gen-model/claim_management';

@Pipe({
    name: 'ccStatusBadgeColor',
})
export class StatusBadgeColorPipe implements PipeTransform {
    transform(status: ClaimStatus): 'primary' | 'warn' | 'error' | 'success' {
        switch (getUnionKey(status)) {
            case 'pending_acceptance':
            case 'accepted':
                return 'success';
            case 'revoked':
                return 'warn';
            case 'denied':
                return 'error';
        }
    }
}
