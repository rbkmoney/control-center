import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccSelectorType',
})
export class SelectorTypePipe implements PipeTransform {
    transform(value: string): any {
        switch (value) {
            case 'attachNew':
                return 'Attach new';
            case 'attach':
                return 'Select from party';
            default:
                return value;
        }
    }
}
