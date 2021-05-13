import { NgModule } from '@angular/core';

import { ClaimStatusPipe } from './claim-status.pipe';
import { PartyModificationNamePipe } from './party-modification-name.pipe';
import { ShopNamePipe } from './shop-name.pipe';

const PIPES = [ClaimStatusPipe, PartyModificationNamePipe, ShopNamePipe];

@NgModule({
    declarations: PIPES,
    exports: PIPES,
})
export class ApiModelPipesModule {}
