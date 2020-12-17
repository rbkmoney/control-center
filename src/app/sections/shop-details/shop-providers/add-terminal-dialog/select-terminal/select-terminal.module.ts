import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { CreateTerminalFormComponent, TerminalsTableComponent } from './components';
import { SelectTerminalComponent } from './select-terminal.component';

@NgModule({
    declarations: [SelectTerminalComponent, TerminalsTableComponent, CreateTerminalFormComponent],
    imports: [
        MatTabsModule,
        ReactiveFormsModule,
        FlexModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
    ],
    exports: [SelectTerminalComponent],
})
export class SelectTerminalModule {}
