import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MenuConfigItem } from './menu-config';

@Component({
    template: '',
    selector: 'cc-timeline-item',
})
export class TimelimeItem {
    @Input()
    menuConfig: MenuConfigItem[];

    @Output()
    menuItemSelected: EventEmitter<MenuConfigItem> = new EventEmitter();

    action(item: MenuConfigItem) {
        this.menuItemSelected.emit(item);
    }
}
