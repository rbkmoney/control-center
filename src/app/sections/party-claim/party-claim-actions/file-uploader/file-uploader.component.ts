import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderComponent {
    @Output()
    filesUploaded: EventEmitter<Modification[]> = new EventEmitter();

    @Input()
    disabled: boolean;
}
