import { Component, OnInit } from '@angular/core';

import { DomainService } from './domain.service';

@Component({
    templateUrl: 'domain.template.html',
    styleUrls: ['../shared/container.css']
})
export class DomainComponent implements OnInit {
    constructor(private domainService: DomainService) {
    }

    ngOnInit() {
        this.domainService.checkout();
    }
}
