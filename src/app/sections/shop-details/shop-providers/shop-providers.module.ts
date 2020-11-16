import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { ProviderModule } from './providers';
import { ShopProvidersComponent } from './shop-providers.component';

@NgModule({
    exports: [ShopProvidersComponent],
    imports: [
        CommonModule,
        ProviderModule,
        FlexModule,
        MatProgressSpinnerModule,
        EmptySearchResultModule,
    ],
    declarations: [ShopProvidersComponent],
})
export class ShopProvidersModule {}
