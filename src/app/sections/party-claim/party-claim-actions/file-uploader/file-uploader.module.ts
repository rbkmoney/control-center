import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ngfModule } from 'angular-file';

import { FileUploaderComponent } from './file-uploader.component';

@NgModule({
    imports: [FlexModule, CommonModule, MatIconModule, MatButtonModule, ngfModule],
    exports: [FileUploaderComponent],
    declarations: [FileUploaderComponent],
})
export class FileUploaderModule {}
