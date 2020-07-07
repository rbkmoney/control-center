import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { RussianDomesticPassport } from '../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-identity-document-info',
    templateUrl: 'identity-document-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentityDocumentInfoComponent {
    @Input() identityDocument: RussianDomesticPassport;
}
