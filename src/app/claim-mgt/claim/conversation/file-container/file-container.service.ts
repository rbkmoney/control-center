import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { booleanDelay } from '../../../../custom-operators';
import { FileStorageService } from '../../../../thrift-services/file-storage/file-storage.service';
import { FileData } from '../../../../thrift-services/file-storage/gen-model/file_storage';
import { download } from './download';

@Injectable()
export class FileContainerService {
    private getFileInfo$ = new Subject<string>();

    fileData$: Observable<FileData> = this.getFileInfo$.pipe(
        switchMap((fileID) => this.fileStorageService.getFileData(fileID)),
        filter((file) => Object.keys(file).length > 0),
        map((file: FileData) => ({ ...file, file_name: decodeURI(file?.file_name) })),
        shareReplay(1)
    );

    isLoading$ = this.fileData$.pipe(booleanDelay(), shareReplay(1));

    constructor(private fileStorageService: FileStorageService, private snackBar: MatSnackBar) {
        this.fileData$.subscribe();
    }

    getFileInfo(fileID: string) {
        this.getFileInfo$.next(fileID);
    }

    downloadFile(fileID: string) {
        this.fileStorageService
            .generateDownloadUrl(fileID, moment().add(1, 'h').toISOString())
            .subscribe(
                (url) => {
                    if (typeof url === 'string') {
                        download(url);
                    } else {
                        this.snackBar.open('File not found', 'OK');
                    }
                },
                () => this.snackBar.open('Download error', 'OK')
            );
    }
}
