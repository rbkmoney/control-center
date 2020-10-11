import { Component, Input } from '@angular/core';
import { coerceBoolean } from 'coerce-property';

@Component({
    selector: 'cc-empty-search-result',
    templateUrl: 'empty-search-result.component.html',
    styleUrls: ['empty-search-result.component.scss'],
})
export class EmptySearchResultComponent {
    @Input() @coerceBoolean unwrapped = false;
}
