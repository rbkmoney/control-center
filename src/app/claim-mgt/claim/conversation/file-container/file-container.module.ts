import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FileStorageService } from '../../../../thrift-services/file-storage/file-storage.service';
import { FileContainerComponent } from './file-container.component';

@NgModule({
    imports: [CommonModule, MatCardModule, FlexModule, MatIconModule],
    exports: [FileContainerComponent],
    declarations: [FileContainerComponent],
    providers: [FileStorageService],
})
export class FileContainerModule {}
