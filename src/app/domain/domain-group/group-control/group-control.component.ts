import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DomainGroup } from '../domain-group';

@Component({
    selector: 'cc-group-control',
    templateUrl: './group-control.component.html'
})
export class GroupControlComponent {
    @Input() group: DomainGroup[];
    @Output() typeSelectionChange: EventEmitter<string[]> = new EventEmitter();
    @Output() regExpPatternChange: EventEmitter<string> = new EventEmitter();

    selectionChange(selectedTypes: string[]) {
        this.typeSelectionChange.emit(selectedTypes);
    }

    patternChange(pattern: string) {
        this.regExpPatternChange.emit(pattern);
    }
}
