import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { ProviderModule } from './provider';
import { ShopProvidersComponent } from './shop-providers.component';

@NgModule({
    declarations: [ShopProvidersComponent],
    imports: [
        CommonModule,
        FlexModule,
        MatProgressSpinnerModule,
        EmptySearchResultModule,
        ProviderModule,
    ],
    exports: [ShopProvidersComponent],
})
export class ShopProvidersModule {}
