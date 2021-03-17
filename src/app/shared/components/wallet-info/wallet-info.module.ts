import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletInfoComponent } from './wallet-info.component';

const DECLARATIONS = [WalletInfoComponent];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
    imports: [CommonModule],
})
export class WalletInfoModule {}
