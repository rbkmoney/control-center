import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { FileStorageService } from '../../../../thrift-services/file-storage/file-storage.service';
import { FileData, FileNotFound } from '../../../../thrift-services/file-storage/gen-model/file_storage';
import { booleanDelay } from '../../../../custom-operators';

@Injectable()
export class FileContainerService {
    private getFileInfo$ = new Subject<string>();

    fileData$: Observable<FileData | FileNotFound> = this.getFileInfo$.pipe(
        switchMap(fileID => this.fileStorageService.getFileData(fileID)),
        shareReplay(1)
    );

    isLoading$ = this.fileData$.pipe(
        booleanDelay(),
        shareReplay(1)
    );

    constructor(
        private fileStorageService: FileStorageService,
        private snackBar: MatSnackBar
    ) {
        this.fileData$.subscribe();
    }

    getFileInfo(fileID: string) {
        this.getFileInfo$.next(fileID);
    }

    downloadFile(fileID: string) {
        // this.fileStorageService
        //     .generateDownloadUrl(fileID, null)
        //     .subscribe(
        //         ({ url }) => download(url),
        //         () => this.snackBar.open('Download error', 'OK')
        //     );
    }
}
