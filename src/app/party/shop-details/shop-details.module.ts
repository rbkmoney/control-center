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
        MatIconModule
    ],
    declarations: [
        ShopDetailsComponent,
        ShopBlockingPipe,
        ShopSuspensionPipe,
        ShopInfoComponent,
        ProviderComponent,
        TerminalComponent,
        AddProviderComponent
    ],
    entryComponents: [AddProviderComponent]
})
export class ShopDetailsModule {}
