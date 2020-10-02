import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrettyJsonModule as AngularPrettyJsonModule } from 'angular2-prettyjson';

import { JsonCleanLookPipe } from './json-clean-look.pipe';
import { PrettyJsonComponent } from './pretty-json.component';

@NgModule({
    imports: [AngularPrettyJsonModule, CommonModule],
    declarations: [PrettyJsonComponent, JsonCleanLookPipe],
    exports: [PrettyJsonComponent],
})
export class PrettyJsonModule {}
