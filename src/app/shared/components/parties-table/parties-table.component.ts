import { Component, Input } from '@angular/core';

import { Party } from '../../../thrift-services/deanonimus/gen-model/deanonimus';

@Component({
    selector: 'cc-parties-table',
    templateUrl: 'parties-table.component.html',
})
export class PartiesTableComponent {
    @Input()
    parties: Party[];
}
