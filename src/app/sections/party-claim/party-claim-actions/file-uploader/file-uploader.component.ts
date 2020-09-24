import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { FileUploaderService } from './file-uploader.service';

@Component({
    selector: 'cc-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FileUploaderService],
})
export class FileUploaderComponent {
    @Output()
    filesUploaded: EventEmitter<Modification[]> = new EventEmitter();

    @Input()
    disabled: boolean;

    startUploading$ = this.fileUploaderService.startUploading$;
    inProgress$ = this.fileUploaderService.inProgress$;

    constructor(private fileUploaderService: FileUploaderService) {}

    startUploading(files: File[]) {
        this.startUploading$.next(files);
    }
}
