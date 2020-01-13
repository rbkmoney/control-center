import { Component, EventEmitter, Output } from '@angular/core';

import { FileUploaderService } from './file-uploader.service';

@Component({
    selector: 'cc-file-uploader',
    templateUrl: 'file-uploader.component.html',
    styleUrls: ['file-uploader.component.css']
})
export class FileUploaderComponent {
    @Output()
    filesUploaded = new EventEmitter<string[]>();

    startUploading$ = this.fileUploaderService.startUploading$;

    constructor(private fileUploaderService: FileUploaderService) {
        this.fileUploaderService.filesUploaded$.subscribe(value => this.filesUploaded.emit(value));
    }

    startUploading(files: File[]) {
        this.startUploading$.next(files);
    }
}
