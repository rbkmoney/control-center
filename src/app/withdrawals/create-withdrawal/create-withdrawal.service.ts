import { Injectable } from '@angular/core';

import { WithdrawalsService } from '../../wapi/withdrawals.service';
import { WithdrawalParameters } from '../../wapi/params';
import { Observable } from 'rxjs';
import { Withdrawal } from '../../wapi/model';

@Injectable()
export class CreateWithdrawalService {

    constructor(private withdrawalsService: WithdrawalsService) {}

    createWithdrawal(params: WithdrawalParameters): Observable<Withdrawal> {
        return this.withdrawalsService.createWithdrawal(params);
    }

}
