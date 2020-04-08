import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DomainGroup } from '../domain-group';

@Component({
    selector: 'cc-group-control',
    templateUrl: './group-control.component.html',
})
export class GroupControlComponent {
    @Input() group: DomainGroup[];
    @Output() typeSelectionChange: EventEmitter<string[]> = new EventEmitter();
    @Output() regExpPatternChange: EventEmitter<string> = new EventEmitter();

    pattern = '';

    selectionChange(selectedTypes: string[]) {
        this.typeSelectionChange.emit(selectedTypes);
    }

    patternChange(pattern: string) {
        this.pattern = pattern;
        this.regExpPatternChange.emit(this.pattern);
    }

    clearPattern() {
        this.pattern = '';
        this.regExpPatternChange.emit(this.pattern);
    }
}
