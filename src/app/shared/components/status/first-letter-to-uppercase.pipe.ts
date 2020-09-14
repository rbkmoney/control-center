import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstLetterToUppercase',
})
export class FirstLetterToUppercasePipe implements PipeTransform {
    transform(value: string): string {
        return value[0].toUpperCase() + value.slice(1);
    }
}
