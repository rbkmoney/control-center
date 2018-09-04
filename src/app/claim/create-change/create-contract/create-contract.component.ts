import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateContractService } from './create-contract.service';

@Component({
    selector: 'cc-create-contract',
    templateUrl: 'create-contract.component.html'
})
export class CreateContractComponent implements OnInit {

    form: FormGroup;
    legalEntityTypes = [
        {
            value: 'RussianLegalEntity',
            name: 'Russian legal entity'
        },
        // {
        //     value: 'InternationalLegalEntity',
        //     name: 'International legal entity'
        // }
    ];

    constructor(private createShopService: CreateContractService) {
    }

    ngOnInit() {
        this.form = this.createShopService.form;
    }
}
