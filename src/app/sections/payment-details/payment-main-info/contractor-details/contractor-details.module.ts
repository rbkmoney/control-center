import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { DetailsItemModule } from '@cc/components/details-item';

import { ContractorDetailsComponent } from './contractor-details.component';

@NgModule({
    declarations: [ContractorDetailsComponent],
    imports: [FlexModule, DetailsItemModule, CommonModule],
    exports: [ContractorDetailsComponent],
})
export class ContractorDetailsModule {}
