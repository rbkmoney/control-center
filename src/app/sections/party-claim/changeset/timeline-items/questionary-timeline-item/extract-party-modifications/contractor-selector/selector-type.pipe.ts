import { Pipe, PipeTransform } from '@angular/core';

import { ActionType } from './action-type';

@Pipe({
    name: 'ccSelectorType',
})
export class SelectorTypePipe implements PipeTransform {
    transform(value: string): any {
        switch (value) {
            case ActionType.attachNew:
                return 'Attach new';
            case ActionType.attach:
                return 'Select from party or from unsaved';
            default:
                return value;
        }
    }
}
