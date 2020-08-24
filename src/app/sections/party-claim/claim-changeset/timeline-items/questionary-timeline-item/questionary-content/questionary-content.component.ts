import { Component, Input } from '@angular/core';
import get from 'lodash-es/get';

import { getUnionValue } from '../../../../../../shared/utils';
import { Questionary } from '../../../../../../thrift-services/ank/gen-model/questionary_manager';

@Component({
    selector: 'cc-questionary-content',
    templateUrl: 'questionary-content.component.html',
})
export class QuestionaryContentComponent {
    @Input()
    questionary: Questionary;

    get entity() {
        return getUnionValue(getUnionValue(get(this.questionary, ['data', 'contractor'])));
    }
}
