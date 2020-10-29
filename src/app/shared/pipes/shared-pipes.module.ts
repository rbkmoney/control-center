import { NgModule } from '@angular/core';

import { ClaimSourcePipe } from './claim-source.pipe';
import { ClaimStatusThriftPipe } from './claim-status-thrift.pipe';
import { ClaimStatusPipe } from './claim-status.pipe';
import { PartyModificationNamePipe } from './party-modification-name.pipe';
import { ShopNamePipe } from './shop-name.pipe';

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
export class SharedPipesModule {}
