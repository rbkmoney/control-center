import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DomainService } from './domain.service';
import { Type2 } from '../metadata/metadata.service';
import { Domain } from '../gen-damsel/domain';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent {
    metadata$: Observable<Type2>;
    data$: Observable<Domain>;

    constructor(private domainService: DomainService) {
        this.metadata$ = this.domainService.metadata$;
        this.data$ = this.domainService.snapshot$.pipe(switchMap((snapshot) => of(snapshot ? snapshot.domain : undefined)));
    }
}
