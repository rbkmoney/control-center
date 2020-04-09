import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'serialNumber',
})
export class SerialNumberPipe implements PipeTransform {
    transform(idx: number, count?: number): string {
        return count > 1 ? `#${idx + 1}` : '';
    }
}
