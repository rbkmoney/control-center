import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'cc-action-item',
    templateUrl: 'action-item.component.html',
})
export class ActionItemComponent {
    @Input()
    description: string;

    @Input()
    hasAction = false;

    @Input()
    actionButtonLabel: string;

    @Input()
    actionDisabled: boolean;

    @Output()
    action: EventEmitter<void> = new EventEmitter<void>();

    doAction() {
        this.action.emit();
    }
}
