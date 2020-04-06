import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BeneficialOwner } from '../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-beneficial-owner-info',
    templateUrl: 'beneficial-owner-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneficialOwnerInfoComponent {
    @Input() beneficialOwner: BeneficialOwner;
}
