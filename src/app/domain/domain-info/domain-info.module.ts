import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DomainInfoComponent } from './domain-info.component';
import { DomainObjDetailsComponent } from './domain-obj-details';
import { DomainGroupModule } from './domain-group';
import { MonacoEditorModule } from '../../monaco-editor';
import { DamselModule } from '../../thrift-services/damsel/damsel.module';
import { SharedModule } from '../../shared/shared.module';

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
        SharedModule
    ]
})
export class DomainInfoModule {}
