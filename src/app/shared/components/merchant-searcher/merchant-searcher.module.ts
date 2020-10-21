import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';

import { MerchantSearcherComponent } from './merchant-searcher.component';

@NgModule({
    declarations: [MerchantSearcherComponent],
    imports: [CommonModule, FlexModule, MatInputModule],
    exports: [MerchantSearcherComponent],
})
export class MerchantSearcherModule {}
