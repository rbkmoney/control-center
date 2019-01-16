import { Component, Input } from '@angular/core';

import { ClaimInfoContainer } from '../../model';
import { ClaimActionType } from '../../claim-action-type';

@Component({
    selector: 'cc-claim-info-details',
    templateUrl: 'claim-info-details.component.html'
})
export class ClaimInfoDetailsComponent {
    @Input()
    claimInfoContainer: ClaimInfoContainer;

    t = ClaimActionType;
}
