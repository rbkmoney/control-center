import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ContractParams } from '../../../../../thrift-services/damsel/gen-model/payment_processing';

@Component({
    selector: 'cc-contract-params',
    templateUrl: 'contract-params.component.html',
})
export class ContractParamsComponent {
    @Input()
    form: FormGroup;

    @Input()
    initialValue: ContractParams;
}
