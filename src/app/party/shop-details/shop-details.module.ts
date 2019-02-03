import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ProviderComponent } from './provider/provider.component';
import { TerminalComponent } from './terminal/terminal.component';
import { ShopBlockingPipe } from './shop-info/shop-blocking.pipe';
import { ShopSuspensionPipe } from './shop-info/shop-suspension.pipe';
import { ShopInfoComponent } from './shop-info/shop-info.component';
import { ShopDetailsComponent } from './shop-details.component';
import { AddProviderComponent } from './add-provider/add-provider.component';
import { TerminalsTableComponent } from './add-provider/terminals-table/terminals-table.component';
import { CreateTerminalFormComponent } from './add-provider/create-terminal-form/create-terminal-form.component';
import { ProvidersTableFormComponent } from './add-provider/providers-table-form/providers-table-form.component';

@NgModule({
    imports: [
        MatExpansionModule,
        MatListModule,
        MatCardModule,
        CommonModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,
        MatProgressBarModule
    ],
    declarations: [
        ShopDetailsComponent,
        ShopBlockingPipe,
        ShopSuspensionPipe,
        ShopInfoComponent,
        ProviderComponent,
        TerminalComponent,
        AddProviderComponent,
        TerminalsTableComponent,
        CreateTerminalFormComponent,
        ProvidersTableFormComponent
    ],
    entryComponents: [AddProviderComponent]
})
export class ShopDetailsModule {}
