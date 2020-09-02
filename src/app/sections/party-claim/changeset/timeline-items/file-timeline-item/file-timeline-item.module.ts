import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { TimelineModule } from '../../../../../shared/components/timeline';
import { FileStorageModule } from '../../../../../thrift-services/file-storage';
import { TimelineComponentsModule } from '../../timeline-components';
import { FileActionIconPipe } from './file-action-icon.pipe';
import { FileBadgeColorPipe } from './file-badge-color.pipe';
import { FileContentComponent } from './file-content/file-content.component';
import { FileHeaderPipe } from './file-header.pipe';
import { FileTimelineItemComponent } from './file-timeline-item.component';

@NgModule({
    imports: [
        FileStorageModule,
        TimelineModule,
        MatIconModule,
        MatMenuModule,
        CommonModule,
        FlexModule,
        MatButtonModule,
        MatCardModule,
        TimelineComponentsModule,
    ],
    declarations: [
        FileTimelineItemComponent,
        FileHeaderPipe,
        FileBadgeColorPipe,
        FileActionIconPipe,
        FileContentComponent,
    ],
    exports: [FileTimelineItemComponent],
})
export class FileTimelineItemModule {}
