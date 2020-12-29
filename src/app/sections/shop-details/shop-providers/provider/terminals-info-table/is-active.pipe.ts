import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccIsActive',
})
export class IsActivePipe implements PipeTransform {
    public transform(input: boolean): string {
        return input ? 'Active' : 'Inactive';
    }
}
