import { Pipe, PipeTransform } from '@angular/core';
import { DepositStatus } from '../fistful/gen-model/fistful_stat';
import { depositStatus } from './deposit-status';

@Pipe({
    name: 'ccDepositStatus'
})
export class DepositStatusPipe implements PipeTransform {
    transform(status: DepositStatus): string {
        return depositStatus(status);
    }
}
