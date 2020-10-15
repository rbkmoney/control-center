import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { EmptySearchResultComponent } from './empty-search-result.component';

@NgModule({
    declarations: [EmptySearchResultComponent],
    exports: [EmptySearchResultComponent],
    imports: [MatCardModule, FlexModule, CommonModule],
})
export class EmptySearchResultModule {}
