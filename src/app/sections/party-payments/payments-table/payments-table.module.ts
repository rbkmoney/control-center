import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { StatusModule } from '../../../shared/components/status';
import { SharedModule } from '../../../shared/shared.module';
import { FirstLetterToUppercasePipe } from './first-letter-to-uppercase.pipe';
import { PaymentsTableComponent } from './payments-table.component';
import { ToColorPipe } from './to-color.pipe';
import { ToStatusPipe } from './to-status.pipe';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        SharedModule,
        FlexModule,
        StatusModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
    ],
    declarations: [PaymentsTableComponent, ToStatusPipe, FirstLetterToUppercasePipe, ToColorPipe],
    exports: [PaymentsTableComponent],
})
export class PaymentsTableModule {}