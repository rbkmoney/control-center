import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HeadlineModule } from '@cc/components/headline';

import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ShopDetailsComponent } from './shop-details.component';
import { ShopMainInfoModule } from './shop-main-info';
import { ShopProvidersModule } from './shop-providers';
import { EditTerminalDialogComponent } from './shop-providers/components';

@NgModule({
    imports: [
        ShopDetailsRoutingModule,
        ShopMainInfoModule,
        HeadlineModule,
        FlexModule,
        MatCardModule,
        CommonModule,
        MatProgressSpinnerModule,
        ShopProvidersModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    declarations: [ShopDetailsComponent, EditTerminalDialogComponent],
    entryComponents: [EditTerminalDialogComponent],
})
export class ShopDetailsModule {}
