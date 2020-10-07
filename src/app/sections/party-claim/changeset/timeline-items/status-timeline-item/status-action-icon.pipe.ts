import { Pipe, PipeTransform } from '@angular/core';

import { getUnionKey } from '@cc/utils/index';

import { ClaimStatus } from '../../../../../thrift-services/damsel/gen-model/claim_management';

@Pipe({
    name: 'ccStatusActionIcon',
})
export class StatusActionIconPipe implements PipeTransform {
    transform(status: ClaimStatus): string {
        switch (getUnionKey(status)) {
            case 'pending_acceptance':
            case 'accepted':
                return 'check';
            case 'revoked':
                return 'block';
            case 'review':
                return 'double_arrow';
            case 'pending':
                return 'double_arrow';
            case 'denied':
                return 'block';
        }
    }
}
