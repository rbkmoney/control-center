import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { FileStorageService } from '../../../../thrift-services/file-storage/file-storage.service';
import { NewFileResult } from '../../../../thrift-services/file-storage/gen-model/file_storage';
import { Value } from '../../../../thrift-services/file-storage/gen-model/msgpack';

@Injectable()
export class FileUploaderService {
    startUploading$ = new Subject<File[]>();

    filesUploadingError$ = new Subject<null>();

    filesUploaded$ = this.startUploading$.pipe(
        tap(kek => console.log(kek, 'this is files')),
        switchMap(files =>
            this.uploadFiles(files).pipe(
                catchError(() => {
                    this.filesUploadingError$.next(null);
                    return of([]);
                })
            )
        ),
        filter(v => !!v.length),
        shareReplay(1)
    );

    constructor(
        private fileStorageService: FileStorageService,
        private snackBar: MatSnackBar,
        private http: HttpClient
    ) {
        this.filesUploadingError$.subscribe(() => this.snackBar.open('File uploading error', 'OK'));
    }

    uploadFiles(files: File[]): Observable<string[]> {
        return forkJoin(
            files.map(file =>
                this.getUploadLink().pipe(
                    switchMap(uploadData => forkJoin(of(uploadData.file_data_id), this.uploadFileToUrl(file, uploadData.upload_url))),
                    map(([fileId]) => fileId)
                )
            )
        );
    }

    private getUploadLink(): Observable<NewFileResult> {
        return this.fileStorageService.createNewFile(new Map<string, Value>(), moment().add(1, 'h').toISOString());
    }

    private uploadFileToUrl(file: File, url: string): Observable<any> {
        return this.http.put(url, file, {
            headers: {
                'Content-Disposition': `attachment;filename=${file.name}`,
                'Content-Type': ''
            }
        });
    }
}
