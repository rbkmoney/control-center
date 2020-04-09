import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ContactInfo } from '../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-contact-info',
    templateUrl: 'contact-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {
    @Input() contactInfo: ContactInfo;
}
