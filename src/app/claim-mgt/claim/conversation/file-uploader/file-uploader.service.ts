import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import * as moment from 'moment';
import { forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { FileStorageService } from '../../../../thrift-services/file-storage/file-storage.service';
import { NewFileResult } from '../../../../thrift-services/file-storage/gen-model/file_storage';
import { Value } from '../../../../thrift-services/file-storage/gen-model/msgpack';

@Injectable()
export class FileUploaderService {
    startUploading$ = new Subject<File[]>();

    filesUploadingError$ = new Subject<null>();

    filesUploaded$: Observable<string[]> = this.startUploading$.pipe(
        switchMap((files) =>
            this.uploadFiles(files).pipe(
                catchError(() => {
                    this.filesUploadingError$.next(null);
                    return of([]);
                })
            )
        ),
        filter((v) => !!v.length),
        shareReplay(1)
    );

    inProgress$: Observable<boolean> = progress(
        this.startUploading$,
        merge(this.filesUploaded$, this.filesUploadingError$)
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
            files.map((file) =>
                this.getUploadLink().pipe(
                    switchMap((uploadData) =>
                        forkJoin(
                            of(uploadData.file_data_id),
                            this.uploadFileToUrl(file, uploadData.upload_url)
                        )
                    ),
                    map(([fileId]) => fileId)
                )
            )
        );
    }

    createModification(id: string): Modification {
        return {
            claim_modification: {
                file_modification: {
                    id,
                    modification: {
                        creation: {}
                    }
                }
            }
        };
    }

    private getUploadLink(): Observable<NewFileResult> {
        return this.fileStorageService.createNewFile(
            new Map<string, Value>(),
            moment().add(1, 'h').toISOString()
        );
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
