import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { CollapseComponent } from './collapse.component';

const EXPORTED_DECLARATIONS = [CollapseComponent];

@NgModule({
    imports: [CommonModule, MatIconModule, FlexLayoutModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class CollapseModule {}
