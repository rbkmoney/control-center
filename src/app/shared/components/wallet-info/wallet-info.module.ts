import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletModule } from '@cc/app/api/fistful/wallet';

import { FistfulModule } from '../../../thrift-services/fistful/fistful.module';
import { WalletInfoComponent } from './wallet-info.component';

const DECLARATIONS = [WalletInfoComponent];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
    imports: [CommonModule, FistfulModule, WalletModule],
})
export class WalletInfoModule {}
