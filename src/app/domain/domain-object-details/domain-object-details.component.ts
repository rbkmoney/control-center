import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DomainObjectDetailsService } from './domain-object-details.service';
import { AbstractDomainObject } from '../domain-group';

@Component({
    selector: 'cc-domain-object-details',
    templateUrl: './domain-object-details.component.html',
    styleUrls: ['./domain-object-details.component.scss']
})
export class DomainObjectDetailsComponent implements OnInit {
    target$: Observable<AbstractDomainObject>;

    constructor(private domainObjectDetailsService: DomainObjectDetailsService) {}

    ngOnInit() {
        this.target$ = this.domainObjectDetailsService.target$;
    }

    close() {
        this.domainObjectDetailsService.close();
    }
}
