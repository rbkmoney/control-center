import { Component, Input } from '@angular/core';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';

@Component({
    selector: 'cc-questionary',
    templateUrl: 'questionary.component.html',
    styleUrls: ['questionary.component.scss']
})
export class QuestionaryComponent {
    @Input() questionary: Questionary;
}
