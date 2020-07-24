import { NgModule } from '@angular/core';
import { ContractorSelectorComponent } from './contractor-selector.component';
import { FlexModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { SelectorTypePipe } from './selector-type.pipe';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
    imports: [
        FlexModule,
        MatRadioModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        SharedModule
    ],
    exports: [
        ContractorSelectorComponent
    ],
    declarations: [ContractorSelectorComponent, SelectorTypePipe]
})
export class ContractorSelectorModule {

}