import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { getUnionKey } from '../../../../../../shared/utils';
import { PartyModification } from '../../../../../../thrift-services/damsel/gen-model/claim_management';

type ModificationType = 'contractor_modification' | 'contract_modification' | 'shop_modification';

@Component({
    selector: 'cc-party-modification-forms',
    templateUrl: 'party-modification-forms.component.html',
})
export class PartyModificationFormsComponent implements OnChanges {
    @Input()
    form: FormGroup;

    @Input()
    mod: PartyModification;

    modType: ModificationType;

    ngOnChanges(changes: SimpleChanges): void {
        const { mod } = changes;
        this.modType = getUnionKey<PartyModification>(mod.currentValue);
    }
}
