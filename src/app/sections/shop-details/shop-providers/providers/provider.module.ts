import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { ProviderComponent } from './provider.component';
import { TerminalInfosTableModule } from './terminal-infos-table';

@NgModule({
    declarations: [ProviderComponent],
    exports: [ProviderComponent],
    imports: [MatCardModule, TerminalInfosTableModule, FlexModule],
})
export class ProviderModule {}
