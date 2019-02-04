import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { shareReplay, map, switchMap } from 'rxjs/operators';

import {
    Domain,
    BusinessScheduleObject,
    ProviderObject,
    TerminalObject,
    PaymentInstitutionObject
} from '../damsel/domain';
import { findDomainObject, findDomainObjects } from './operations/utils';
import { createShopTerminal } from './operations';
import { toGenReference } from './converters';
import { DomainService } from './domain.service';
import { addDecisionToProvider, AddDecisionToProvider, CreateTerminalParams } from './operations';

const findBusinessScheduleObjects = (domain: Domain): BusinessScheduleObject[] =>
    findDomainObjects(domain, 'business_schedule');

const findProviderObjects = (domain: Domain): ProviderObject[] =>
    findDomainObjects(domain, 'provider');

const findTerminalObjects = (domain: Domain): TerminalObject[] =>
    findDomainObjects(domain, 'terminal');

const findPaymentInstitutions = (domain: Domain): PaymentInstitutionObject[] =>
    findDomainObjects(domain, 'payment_institution');

const filterByTerminalSelector = (
    objects: ProviderObject[],
    filterValue: 'decisions' | 'value'
): ProviderObject[] => {
    return objects.filter(object => {
        const selector = object.data.terminal;
        switch (filterValue) {
            case 'decisions':
                return selector.decisions;
            case 'value':
                return selector.value;
        }
    });
};

@Injectable()
export class DomainTypedManager {
    private domain: Observable<Domain>;

    constructor(private dmtService: DomainService) {
        this.domain = this.dmtService.checkout(toGenReference()).pipe(
            map(s => s.domain),
            shareReplay(1)
        );
    }

    getBusinessScheduleObjects(): Observable<BusinessScheduleObject[]> {
        return this.domain.pipe(map(domain => findBusinessScheduleObjects(domain)));
    }

    getBusinessScheduleObject(id: number): Observable<BusinessScheduleObject> {
        return this.domain.pipe(
            map(domain => findBusinessScheduleObjects(domain)),
            map(objects => findDomainObject(objects, id))
        );
    }

    getProviderObjects(): Observable<ProviderObject[]> {
        return this.domain.pipe(map(domain => findProviderObjects(domain)));
    }

    getProviderObjectsWithSelector(
        filterValue: 'decisions' | 'value'
    ): Observable<ProviderObject[]> {
        return this.getProviderObjects().pipe(
            map(objects => filterByTerminalSelector(objects, filterValue))
        );
    }

    getProviderObject(id: number): Observable<ProviderObject> {
        return this.domain.pipe(
            map(domain => findProviderObjects(domain)),
            map(objects => findDomainObject(objects, id))
        );
    }

    getTerminalObjects(): Observable<TerminalObject[]> {
        return this.domain.pipe(map(domain => findTerminalObjects(domain)));
    }

    getTerminalObject(id: number): Observable<TerminalObject> {
        return this.domain.pipe(
            map(domain => findTerminalObjects(domain)),
            map(objects => findDomainObject(objects, id))
        );
    }

    createTerminal(params: CreateTerminalParams): Observable<void> {
        return combineLatest(
            this.getLastVersion(),
            this.getTerminalObjects(),
            this.getProviderObject(params.providerID)
        ).pipe(
            switchMap(([version, terminalObjects, providerObject]) =>
                this.dmtService.commit(
                    version,
                    createShopTerminal(terminalObjects, providerObject, params)
                )
            ),
            switchMap(() => this.getNewDomain())
        );
    }

    addProviderDecision(params: AddDecisionToProvider): Observable<void> {
        return combineLatest(this.getLastVersion(), this.getProviderObjects()).pipe(
            switchMap(([version, providerObjects]) =>
                this.dmtService.commit(version, addDecisionToProvider(providerObjects, params))
            ),
            switchMap(() => this.getNewDomain())
        );
    }

    getLastVersion(): Observable<any> {
        return this.dmtService.checkout(toGenReference()).pipe(map(snapshot => snapshot.version));
    }

    getNewDomain(): Observable<void> {
        return Observable.create(observer => {
            this.domain = this.dmtService.checkout(toGenReference()).pipe(
                map(s => s.domain),
                shareReplay(1)
            );
            observer.next(this.domain);
            observer.complete();
        });
    }

    getPaymentInstitutions(): Observable<PaymentInstitutionObject[]> {
        return this.domain.pipe(map(domain => findPaymentInstitutions(domain)));
    }
}
