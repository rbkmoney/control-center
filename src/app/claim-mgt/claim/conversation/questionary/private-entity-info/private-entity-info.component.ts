import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RussianPrivateEntity } from '../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-private-entity-info',
    templateUrl: 'private-entity-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateEntityInfoComponent {
    @Input() privateEntity: RussianPrivateEntity;
}
