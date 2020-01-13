import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { ngfModule } from 'angular-file';

import { FileUploaderComponent } from './file-uploader.component';
import { FileUploaderService } from './file-uploader.service';

@NgModule({
    imports: [FlexModule, ngfModule, CommonModule],
    exports: [FileUploaderComponent],
    declarations: [FileUploaderComponent],
    providers: [FileUploaderService]
})
export class FileUploaderModule {}
