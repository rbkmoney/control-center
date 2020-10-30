import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CardContainerModule } from '@cc/components/card-container/card-container.module';

import { MonacoEditorModule } from '../../monaco-editor';
import { DamselModule } from '../../thrift-services/damsel';
import { DomainGroupModule } from './domain-group';
import { DomainInfoComponent } from './domain-info.component';
import { DomainObjDetailsComponent } from './domain-obj-details';

@NgModule({
    declarations: [DomainInfoComponent, DomainObjDetailsComponent],
    imports: [
        CommonModule,
        DomainGroupModule,
        FlexLayoutModule,
        MatCardModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MonacoEditorModule,
        DamselModule,
        CardContainerModule,
    ],
})
export class DomainInfoModule {}
