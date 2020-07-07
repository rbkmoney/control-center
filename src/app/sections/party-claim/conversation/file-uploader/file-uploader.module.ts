import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ngfModule } from 'angular-file';

import { FileStorageModule } from '../../../../thrift-services/file-storage';
import { FileUploaderComponent } from './file-uploader.component';
import { FileUploaderService } from './file-uploader.service';

@NgModule({
    imports: [
        FlexModule,
        ngfModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FileStorageModule,
    ],
    exports: [FileUploaderComponent],
    declarations: [FileUploaderComponent],
    providers: [FileUploaderService],
})
export class FileUploaderModule {}
