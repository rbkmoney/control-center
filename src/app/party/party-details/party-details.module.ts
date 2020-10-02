import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { PipesModule } from '@cc/app/shared/pipes/pipes.module';
import { CardContainerModule } from '@cc/components/card-container/card-container.module';

import { PartyDetailsComponent } from './party-details.component';
import { PartyInfoComponent } from './party-info/party-info.component';
import { ShopsTableComponent } from './shops-table/shops-table.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        PipesModule,
        CardContainerModule,
    ],
    declarations: [PartyDetailsComponent, ShopsTableComponent, PartyInfoComponent],
})
export class PartyDetailsModule {}
