import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FileContainerComponent } from './file-container.component';
import { FileStorageService } from '../../../../thrift-services/file-storage/file-storage.service';

@NgModule({
    imports: [CommonModule, MatCardModule, FlexModule, MatIconModule],
    exports: [FileContainerComponent],
    declarations: [FileContainerComponent],
    providers: [FileStorageService]
})
export class FileContainerModule {}
