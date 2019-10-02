import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { DepositParams } from './gen-model/fistful';
import { DepositParams as DepositParamsObject } from './gen-nodejs/fistful_types';
import { ThriftService } from '../thrift';
import * as FistfulAdmin from './gen-nodejs/FistfulAdmin';

@Injectable()
export class FistfulAdminService extends ThriftService {
    constructor(zone: NgZone) {
        super(zone, '/v1/admin', FistfulAdmin);
    }

    createDeposit(params: DepositParams): Observable<void> {
        return this.toObservableAction('CreateDeposit')(new DepositParamsObject(params));
    }

}
