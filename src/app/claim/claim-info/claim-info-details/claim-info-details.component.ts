import { Component, Input } from '@angular/core';

import { ClaimActionType } from '../../claim-action-type';
import { ClaimInfoContainer } from '../../model';

@Component({
    selector: 'cc-claim-info-details',
    templateUrl: 'claim-info-details.component.html',
})
export class ClaimInfoDetailsComponent {
    @Input()
    claimInfoContainer: ClaimInfoContainer;

    t = ClaimActionType;
}
