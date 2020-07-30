import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { InternationalLegalEntity } from '../../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-international-entity',
    templateUrl: 'international-entity.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalEntityComponent {
    @Input() entity: InternationalLegalEntity;
}
