import { Pipe, PipeTransform } from '@angular/core';

import { ActionType } from './action-type';

@Pipe({
    name: 'ccSelectorType',
})
export class SelectorTypePipe implements PipeTransform {
    transform(value: string): any {
        switch (value) {
            case ActionType.AttachNew:
                return 'Attach new';
            case ActionType.Attach:
                return 'Select from party or from unsaved';
            default:
                return value;
        }
    }
}
