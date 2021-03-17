import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DestinationInfoComponent } from './destination-info.component';

const DECLARATIONS = [DestinationInfoComponent];

@NgModule({
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
    imports: [CommonModule],
})
export class DestinationInfoModule {}
