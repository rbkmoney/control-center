import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RussianIndividualEntity } from '../../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-individual-entity-info',
    templateUrl: 'individual-entity-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividualEntityInfoComponent {
    @Input() individualEntity: RussianIndividualEntity;
}
