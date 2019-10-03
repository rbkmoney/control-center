import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DepositParams } from '../../fistful/gen-model/fistful';
import { FistfulAdminService } from '../../fistful/fistful-admin.service';

@Injectable()
export class CreateDepositService {
    constructor(private fistfulAdminService: FistfulAdminService) {}

    createDeposit(params: DepositParams): Observable<void> {
        return this.fistfulAdminService.createDeposit(params);
    }
}
