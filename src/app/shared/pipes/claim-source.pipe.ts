import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccClaimSource'
})
export class ClaimSourcePipe implements PipeTransform {
    transform(value: any): string {
        return 'Unknown';
    }
}
