import { Component, OnInit } from '@angular/core';

import { DepositsService } from './deposits.service';

@Component({
    templateUrl: 'deposits.component.html'
})
export class DepositsComponent implements OnInit {

    constructor(private depositsService: DepositsService) {}

    ngOnInit() {
        this.depositsService.fetchDeposits({ fromTime: '2019-09-09T00:00:00Z', toTime: '2019-10-10T00:00:00Z', partyId: ''}).subscribe((res) => {
            console.log(res);
        });
    }

}
