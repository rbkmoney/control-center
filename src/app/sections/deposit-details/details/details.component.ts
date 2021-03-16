import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { StatDeposit } from '../../../thrift-services/fistful/gen-model/fistful_stat';

@Component({
    selector: 'cc-details',
    templateUrl: 'details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
    @Input()
    deposit: StatDeposit;
}
