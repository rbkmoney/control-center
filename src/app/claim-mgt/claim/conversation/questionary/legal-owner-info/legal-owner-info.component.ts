import { Component, Input } from '@angular/core';

import { LegalOwnerInfo } from '../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-legal-owner-info',
    templateUrl: 'legal-owner-info.component.html'
})
export class LegalOwnerInfoComponent {
    @Input() legalOwnerInfo: LegalOwnerInfo;
}
