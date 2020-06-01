import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from '../../shared/shared.module';
import { AddProviderComponent } from './add-provider/add-provider.component';
import { SelectProviderComponent } from './add-provider/select-provider/select-provider.component';
import { CreateTerminalFormComponent } from './add-provider/select-terminal/create-terminal-form/create-terminal-form.component';
import { SelectTerminalComponent } from './add-provider/select-terminal/select-terminal.component';
import { TerminalsTableComponent } from './add-provider/select-terminal/terminals-table/terminals-table.component';
import { EditTerminalDecisionPriorityComponent } from './edit-terminal-decision/edit-terminal-decision-priority/edit-terminal-decision-priority.component';
import { EditTerminalDecisionWeightComponent } from './edit-terminal-decision/edit-terminal-decision-weight/edit-terminal-decision-weight.component';
import { IsActivePipe } from './is-active.pipe';
import { ProviderComponent } from './provider/provider.component';
import { ShopDetailsComponent } from './shop-details.component';
import { CategoryComponent } from './shop-info/category/category.component';
import { ShopBlockingPipe } from './shop-info/shop-blocking.pipe';
import { ShopInfoComponent } from './shop-info/shop-info.component';
import { ShopSuspensionPipe } from './shop-info/shop-suspension.pipe';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalsComponent } from './terminals/terminals.component';

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
        MatProgressBarModule,
        MatMenuModule,
        MatProgressBarModule,
        MatChipsModule,
        SharedModule,
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
        SelectProviderComponent,
        SelectTerminalComponent,
        IsActivePipe,
        CategoryComponent,
        EditTerminalDecisionPriorityComponent,
        EditTerminalDecisionWeightComponent,
        TerminalsComponent,
    ],
    entryComponents: [
        AddProviderComponent,
        EditTerminalDecisionPriorityComponent,
        EditTerminalDecisionWeightComponent,
    ],
    exports: [CategoryComponent],
})
export class ShopDetailsModule {}
