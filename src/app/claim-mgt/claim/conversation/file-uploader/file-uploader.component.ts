import { Component, EventEmitter, Output } from '@angular/core';

import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { FileUploaderService } from './file-uploader.service';

@Component({
    selector: 'cc-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.css']
})
export class FileUploaderComponent {
    @Output()
    filesUploaded: EventEmitter<Modification[]> = new EventEmitter();

    startUploading$ = this.fileUploaderService.startUploading$;
    inProgress$ = this.fileUploaderService.inProgress$;

    constructor(private fileUploaderService: FileUploaderService) {
        this.fileUploaderService.filesUploaded$.subscribe((values) =>
            this.filesUploaded.emit(
                values.map((v) => this.fileUploaderService.createModification(v))
            )
        );
    }

    startUploading(files: File[]) {
        this.startUploading$.next(files);
    }
}
