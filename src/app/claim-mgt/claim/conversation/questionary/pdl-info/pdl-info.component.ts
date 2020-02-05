import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'cc-pdl-info',
    templateUrl: 'pdl-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdlInfoComponent {
    @Input()
    pdl: { pdl_category: string; pdl_relation_degree: string };
}
