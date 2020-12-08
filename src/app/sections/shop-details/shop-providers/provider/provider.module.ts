import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { ProviderComponent } from './provider.component';
import { TerminalInfosTableModule } from './terminal-infos-table/terminal-infos-table.module';

@NgModule({
    declarations: [ProviderComponent],
    exports: [ProviderComponent],
    imports: [MatCardModule, FlexModule, TerminalInfosTableModule],
})
export class ProviderModule {}
