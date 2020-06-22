import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FileContainerComponent } from './file-container.component';
import { FileStorageModule } from '../../../../thrift-services/file-storage';

@NgModule({
    imports: [CommonModule, MatCardModule, FlexModule, MatIconModule, FileStorageModule],
    exports: [FileContainerComponent],
    declarations: [FileContainerComponent],
})
export class FileContainerModule {}
