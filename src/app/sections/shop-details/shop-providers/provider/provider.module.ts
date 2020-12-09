import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { ProviderComponent } from './provider.component';
import { TerminalInfoTableModule } from './terminal-info-table/terminal-info-table.module';

@NgModule({
    declarations: [ProviderComponent],
    exports: [ProviderComponent],
    imports: [MatCardModule, FlexModule, TerminalInfoTableModule],
})
export class ProviderModule {}
