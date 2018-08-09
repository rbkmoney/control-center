import { Component } from '@angular/core';

import { ClaimService } from './claim.service';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: ['./claim.component.css'],
    providers: [ClaimService]
})
export class ClaimComponent {

}
