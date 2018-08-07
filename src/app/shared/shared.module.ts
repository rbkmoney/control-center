import { NgModule } from '@angular/core';

import { ClaimStatusPipe } from './claim-status.pipe';

@NgModule({
    declarations: [
        ClaimStatusPipe
    ],
    exports: [
        ClaimStatusPipe
    ]
})
export class SharedModule {}
