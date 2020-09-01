import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomainService } from '../../../../domain';

@Injectable()
export class PaymentsOtherSearchFiltersService {
    currentDomainVersion$ = this.domainService.version$;

    constructor(private route: ActivatedRoute, private domainService: DomainService) {}
}
