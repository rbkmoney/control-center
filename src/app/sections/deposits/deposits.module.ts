import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';
import { CreateDepositDialogModule } from './create-deposit-dialog/create-deposit-dialog.module';
import { SearchFiltersModule } from './search-filters/search-filters.module';

@NgModule({
    imports: [
        DepositsRoutingModule,
        MatCardModule,
        FlexModule,
        CommonModule,
        MatButtonModule,
        CreateDepositDialogModule,
        SearchFiltersModule,
    ],
    declarations: [DepositsComponent],
})
export class DepositsModule {}
