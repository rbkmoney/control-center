import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/utils';
import * as moment from 'moment';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { FileStorageService } from '../../../../../thrift-services/file-storage/file-storage.service';
import { FileData } from '../../../../../thrift-services/file-storage/gen-model/file_storage';
import { download } from './download';

@Injectable()
export class FileTimelineItemService {
    private getFileInfo$ = new Subject<string>();
    private hasError$ = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    fileData$: Observable<FileData> = this.getFileInfo$.pipe(
        switchMap((fileID) =>
            this.fileStorageService.getFileData(fileID).pipe(
                catchError((e) => {
                    this.hasError$.next(e);
                    return of(e);
                })
            )
        ),
        filter((file) => Object.keys(file).length > 0),
        map((file: FileData) => ({ ...file, file_name: decodeURI(file?.file_name) })),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = this.hasError$.asObservable();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(this.getFileInfo$, merge(this.fileData$, this.hasError$));

    constructor(private fileStorageService: FileStorageService) {
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
                        this.hasError$.next('File not found');
                    }
                },
                (e) => this.hasError$.next(e)
            );
    }
}
