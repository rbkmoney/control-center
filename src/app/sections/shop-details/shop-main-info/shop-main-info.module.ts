import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { StatusModule } from '@cc/app/shared/components';
import { DetailsItemModule } from '@cc/components/details-item';

import { CategoryComponent } from './components/category/category.component';
import { ShopBlockingPipe } from './shop-blocking.pipe';
import { ShopMainInfoComponent } from './shop-main-info.component';
import { ShopSuspensionPipe } from './shop-suspension.pipe';

@NgModule({
    imports: [FlexModule, DetailsItemModule, StatusModule, CommonModule],
    declarations: [ShopMainInfoComponent, CategoryComponent, ShopBlockingPipe, ShopSuspensionPipe],
    exports: [ShopMainInfoComponent],
})
export class ShopMainInfoModule {}
