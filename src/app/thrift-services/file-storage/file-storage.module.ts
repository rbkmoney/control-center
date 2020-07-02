import { NgModule } from '@angular/core';

import { FileStorageService } from './file-storage.service';

@NgModule({
    providers: [FileStorageService],
})
export class FileStorageModule {}
