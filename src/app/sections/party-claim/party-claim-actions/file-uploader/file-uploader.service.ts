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
import { UnsavedClaimChangesetService } from '../../changeset/unsaved-changeset/unsaved-claim-changeset.service';

@Injectable()
export class FileUploaderService {
    startUploading$ = new Subject<File[]>();
    filesUploadingError$ = new Subject<null>();

    filesUploaded$: Observable<string> = this.startUploading$.pipe(
        switchMap((files) =>
            this.uploadFile(files.pop()).pipe(
                catchError((e) => {
                    this.snackBar.open('File uploading error', 'OK');
                    this.filesUploadingError$.next(e);
                    return of('error');
                })
            )
        ),
        filter((result) => result !== 'error'),
        shareReplay(1)
    );

    inProgress$: Observable<boolean> = progress(
        this.startUploading$,
        merge(this.filesUploaded$, this.filesUploadingError$)
    );
    constructor(
        private fileStorageService: FileStorageService,
        private snackBar: MatSnackBar,
        private http: HttpClient,
        private unsavedClaimChangesetService: UnsavedClaimChangesetService
    ) {
        this.filesUploaded$.subscribe((fileId) =>
            this.unsavedClaimChangesetService.addModification(this.createModification(fileId))
        );
    }

    uploadFile(file: File): Observable<string> {
        return this.getUploadLink().pipe(
            switchMap((uploadData) =>
                forkJoin([
                    of(uploadData.file_data_id),
                    this.uploadFileToUrl(file, uploadData.upload_url),
                ])
            ),
            map(([fileId]) => fileId)
        );
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
                'Content-Disposition': `attachment;filename=${encodeURI(file.name)}`,
                'Content-Type': '',
            },
        });
    }

    private createModification(id: string): Modification {
        return {
            claim_modification: {
                file_modification: {
                    id,
                    modification: {
                        creation: {},
                    },
                },
            },
        };
    }
}
