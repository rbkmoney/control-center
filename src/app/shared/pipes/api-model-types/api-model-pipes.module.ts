import { NgModule } from '@angular/core';

import { ClaimStatusPipe } from './claim-status.pipe';
import { PartyModificationNamePipe } from './party-modification-name.pipe';
import { ShopNamePipe } from './shop-name.pipe';

const pipes = [ClaimStatusPipe, PartyModificationNamePipe, ShopNamePipe];

@NgModule({
    declarations: pipes,
    exports: pipes,
})
export class ApiModelPipesModule {}
