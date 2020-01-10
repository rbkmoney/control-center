import { Component, Input, OnInit } from '@angular/core';

import { FileContainerService } from './file-container.service';


@Component({
    selector: 'cc-file-container',
    templateUrl: 'file-container.component.html',
    styleUrls: ['file-container.component.css'],
    providers: [FileContainerService]
})
export class FileContainerComponent implements OnInit {
    @Input()
    fileID: string;

    fileData$ = this.fileContainerService.fileData$;

    constructor(private fileContainerService: FileContainerService) {}

    ngOnInit() {
        this.fileContainerService.getFileInfo(this.fileID);
    }
}
