import { Injectable, NgZone } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

import { ThriftService } from '../thrift-service';
import * as FileStorage from './gen-nodejs/FileStorage';
import {
    FileData,
    FileDataID,
    FileNotFound,
    Metadata,
    NewFileResult,
    URL
} from './gen-model/file_storage';
import { Timestamp } from './gen-model/base';

@Injectable()
export class FileStorageService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/file_storage', FileStorage);
    }

    createNewFile = (metadata: Metadata, expires_at: Timestamp): Observable<NewFileResult> =>
        this.toObservableAction('CreateNewFile')(metadata, expires_at);

    generateDownloadUrl = (
        file_data_id: FileDataID,
        expires_at: Timestamp
    ): Observable<URL | FileNotFound> =>
        this.toObservableAction('GenerateDownloadUrl')(file_data_id, expires_at);

    getFileData = (file_data_id: FileDataID): Observable<FileData | FileNotFound> =>
        this.toObservableAction('GetFileData')(file_data_id);
}
