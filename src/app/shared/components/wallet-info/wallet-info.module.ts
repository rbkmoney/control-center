import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletModule } from '@cc/app/api/fistful/wallet';

import { WalletInfoComponent } from './wallet-info.component';

const DECLARATIONS = [WalletInfoComponent];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
    imports: [CommonModule, WalletModule],
})
export class WalletInfoModule {}
