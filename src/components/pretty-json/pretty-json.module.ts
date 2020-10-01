import { NgModule } from '@angular/core';
import { PrettyJsonModule as AngularPrettyJsonModule } from 'angular2-prettyjson';

import { JsonCleanLookPipe } from './json-clean-look.pipe';
import { PrettyJsonComponent } from './pretty-json.component';

@NgModule({
    declarations: [PrettyJsonComponent, JsonCleanLookPipe],
    exports: [PrettyJsonComponent, JsonCleanLookPipe],
    imports: [AngularPrettyJsonModule],
})
export class PrettyJsonModule {}
