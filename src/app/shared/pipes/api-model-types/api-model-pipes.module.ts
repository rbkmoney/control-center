import { NgModule } from '@angular/core';

import { ClaimSourcePipe } from './claim-source.pipe';
import { ClaimStatusPipe } from './claim-status.pipe';
import { PartyModificationNamePipe } from './party-modification-name.pipe';
import { ShopNamePipe } from './shop-name.pipe';

const pipes = [ClaimSourcePipe, ClaimStatusPipe, PartyModificationNamePipe, ShopNamePipe];

@NgModule({
    declarations: pipes,
    exports: pipes,
})
export class ApiModelPipesModule {}
