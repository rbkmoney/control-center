import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { PaymentsTableComponent } from '@cc/app/shared/components';
import { SharedPipesModule } from '@cc/app/shared/pipes';
import { StatusModule } from '@cc/components/status';
import { CommonPipesModule } from '@cc/pipes/common-pipes.module';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        SharedPipesModule,
        FlexModule,
        StatusModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        CommonPipesModule,
    ],
    declarations: [PaymentsTableComponent],
    exports: [PaymentsTableComponent],
})
export class PaymentsTableModule {}
