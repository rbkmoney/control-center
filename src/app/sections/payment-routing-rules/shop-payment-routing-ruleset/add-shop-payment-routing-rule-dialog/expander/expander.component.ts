import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'cc-expander',
    templateUrl: 'expander.component.html',
    styleUrls: ['expander.component.scss'],
})
export class ExpanderComponent {
    @Input() title: string;
    @Output() remove = new EventEmitter<void>();

    expanded = true;

    toggle() {
        this.expanded = !this.expanded;
    }
}
