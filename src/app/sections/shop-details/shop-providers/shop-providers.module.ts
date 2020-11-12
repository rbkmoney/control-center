import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProviderModule } from './providers';
import { ShopProvidersComponent } from './shop-providers.component';

@NgModule({
    exports: [ShopProvidersComponent],
    imports: [CommonModule, ProviderModule],
    declarations: [ShopProvidersComponent],
})
export class ShopProvidersModule {}
