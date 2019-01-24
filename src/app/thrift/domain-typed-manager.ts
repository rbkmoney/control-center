import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/internal/operators';

import {
    Domain,
    BusinessScheduleObject,
    ProviderObject,
    TerminalObject,
    PaymentInstitutionObject
} from '../damsel/domain';
import { Version } from '../damsel';
import { CreateTerminalParams } from '../claim/domain-typed-manager';
import { findDomainObject, findDomainObjects } from '../claim/domain-typed-manager/utils';
import { createShopTerminal } from '../claim/domain-typed-manager/create-shop-terminal';
import { toGenReference } from './converters';
import { DomainService } from './domain.service';

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
    filter: 'decisions' | 'value'
): ProviderObject[] => {
    return objects.filter(object => {
        const selector = object.data.terminal;
        switch (filter) {
            case 'decisions':
                return selector.decisions;
            case 'value':
                return selector.value;
        }
    });
};

@Injectable()
export class DomainTypedManager {
    private domain: Domain;

    constructor(private dmtService: DomainService) {}

    getBusinessScheduleObjects(): Observable<BusinessScheduleObject[]> {
        return this.getDomain().pipe(map(domain => findBusinessScheduleObjects(domain)));
    }

    getBusinessScheduleObject(id: number): Observable<BusinessScheduleObject> {
        return this.getDomain().pipe(
            map(domain => findBusinessScheduleObjects(domain)),
            map(objects => findDomainObject(objects, id))
        );
    }

    getProviderObjects(): Observable<ProviderObject[]> {
        return this.getDomain().pipe(map(domain => findProviderObjects(domain)));
    }

    getProviderObjectsWithSelector(filter: 'decisions' | 'value'): Observable<ProviderObject[]> {
        return this.getProviderObjects().pipe(
            map(objects => filterByTerminalSelector(objects, filter))
        );
    }

    getProviderObject(id: number): Observable<ProviderObject> {
        return this.getDomain().pipe(
            map(domain => findProviderObjects(domain)),
            map(objects => findDomainObject(objects, id))
        );
    }

    getTerminalObjects(): Observable<TerminalObject[]> {
        return this.getDomain().pipe(map(domain => findTerminalObjects(domain)));
    }

    getTerminalObject(id: number): Observable<TerminalObject> {
        return this.getDomain().pipe(
            map(domain => findTerminalObjects(domain)),
            map(objects => findDomainObject(objects, id))
        );
    }

    createTerminal(params: CreateTerminalParams): Observable<Version> {
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
            )
        );
    }

    getLastVersion(): Observable<any> {
        return this.dmtService.checkout(toGenReference()).pipe(
            tap(snapshot => (this.domain = snapshot.domain)),
            map(snapshot => snapshot.version)
        );
    }

    getPaymentInstitutions(): Observable<PaymentInstitutionObject[]> {
        return this.getDomain().pipe(map(domain => findPaymentInstitutions(domain)));
    }

    private getDomain(): Observable<Domain> {
        if (this.domain) {
            return Observable.create(observer => {
                observer.next(this.domain);
                observer.complete();
            });
        } else {
            return this.dmtService.checkout(toGenReference()).pipe(
                map(snapshot => snapshot.domain),
                tap(domain => (this.domain = domain))
            );
        }
    }
}
