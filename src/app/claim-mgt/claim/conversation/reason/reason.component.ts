import { Component, Input } from '@angular/core';

import { StatusModificationUnit } from '../../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-reason',
    templateUrl: 'reason.component.html'
})
export class ReasonComponent {
    @Input() statusModificationUnit: StatusModificationUnit;
}
