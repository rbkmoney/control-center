import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { AddTerminalDialogModule } from './add-terminal-dialog';
import { EditTerminalDialogComponent } from './components/edit-terminal-dialog';
import { ProviderModule } from './provider';
import { ShopProvidersComponent } from './shop-providers.component';

@NgModule({
    declarations: [ShopProvidersComponent, EditTerminalDialogComponent],
    imports: [
        CommonModule,
        FlexModule,
        MatProgressSpinnerModule,
        EmptySearchResultModule,
        ProviderModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        AddTerminalDialogModule,
    ],
    entryComponents: [EditTerminalDialogComponent],
    exports: [ShopProvidersComponent],
})
export class ShopProvidersModule {}
