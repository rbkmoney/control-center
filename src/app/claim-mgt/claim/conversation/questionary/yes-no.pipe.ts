import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {
    transform(bool: boolean): string {
        if (typeof bool !== 'boolean') {
            return '';
        }
        return bool ? 'Yes' : 'No';
    }
}
