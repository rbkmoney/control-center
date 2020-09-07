import { Injectable } from '@angular/core';

import { DomainService } from '../../../../../domain';

@Injectable()
export class OtherFiltersDialogService {
    currentDomainVersion$ = this.domainService.version$;

    constructor(private domainService: DomainService) {}
}
