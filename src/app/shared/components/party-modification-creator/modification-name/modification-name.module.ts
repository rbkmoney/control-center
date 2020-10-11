import { NgModule } from '@angular/core';

import { ModificationNamePipe } from './modification-name.pipe';

@NgModule({
    declarations: [ModificationNamePipe],
    exports: [ModificationNamePipe],
})
export class ModificationNameModule {}
