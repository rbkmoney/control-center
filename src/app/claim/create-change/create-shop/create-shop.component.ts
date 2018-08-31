import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateShopService } from './create-shop.service';

@Component({
    selector: 'cc-create-shop',
    templateUrl: 'create-shop.component.html'
})
export class CreateShopComponent implements OnInit {

    form: FormGroup;

    constructor(private createShopService: CreateShopService) {
    }

    ngOnInit() {
        this.form = this.createShopService.form;
    }
}
