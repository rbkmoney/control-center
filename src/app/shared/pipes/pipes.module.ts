import { NgModule } from '@angular/core';

import {
    ClaimSourcePipe,
    ClaimStatusPipe,
    ClaimStatusThriftPipe,
    PartyModificationNamePipe,
    ShopNamePipe,
} from './index';

const declarations = [
    ClaimStatusThriftPipe,
    ClaimStatusPipe,
    ClaimSourcePipe,
    ShopNamePipe,
    PartyModificationNamePipe,
];

@NgModule({
    declarations,
    exports: declarations,
})
export class PipesModule {}
