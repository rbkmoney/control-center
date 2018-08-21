import { Component, Input } from '@angular/core';
import { ClaimInfoContainer } from '../../model';

@Component({
    selector: 'cc-claim-info-details',
    templateUrl: 'claim-info-details.component.html',
    styleUrls: ['./claim-info-details.component.css']
})
export class ClaimInfoDetailsComponent {

    @Input()
    claimInfoContainer: ClaimInfoContainer;

}
