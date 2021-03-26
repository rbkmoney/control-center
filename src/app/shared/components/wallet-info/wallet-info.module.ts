import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FistfulModule } from '../../../thrift-services/fistful/fistful.module';
import { WalletInfoComponent } from './wallet-info.component';

const DECLARATIONS = [WalletInfoComponent];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
    imports: [CommonModule, FistfulModule],
})
export class WalletInfoModule {}
