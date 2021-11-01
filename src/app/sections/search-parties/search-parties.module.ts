import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { PartiesSearchFiltersModule } from './parties-search-filters';
import { PartiesTableModule } from './parties-table';
import { SearchPartiesRoutingModule } from './search-parties-routing.module';
import { SearchPartiesComponent } from './search-parties.component';

@NgModule({
    imports: [
        SearchPartiesRoutingModule,
        FlexModule,
        MatCardModule,
        PartiesSearchFiltersModule,
        PartiesTableModule,
        CommonModule,
        EmptySearchResultModule,
        MatProgressBarModule,
    ],
    declarations: [SearchPartiesComponent],
})
export class SearchPartiesModule {}
