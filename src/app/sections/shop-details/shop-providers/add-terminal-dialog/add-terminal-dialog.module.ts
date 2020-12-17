import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';

import { AddTerminalDialogComponent } from './add-terminal-dialog.component';
import { SelectProviderComponent } from './components';
import { SelectTerminalModule } from './select-terminal/select-terminal.module';

@NgModule({
    declarations: [AddTerminalDialogComponent, SelectProviderComponent],
    entryComponents: [AddTerminalDialogComponent],
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatProgressBarModule,
        CommonModule,
        MatStepperModule,
        FlexModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        SelectTerminalModule,
    ],
})
export class AddTerminalDialogModule {}
