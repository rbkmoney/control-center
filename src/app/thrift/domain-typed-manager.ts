import { Injectable, NgZone } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/internal/operators';

import { BusinessScheduleObject, Domain, PaymentInstitutionObject, ProviderObject, TerminalObject } from '../damsel/domain';
import { Version } from '../damsel';
import { CreateTerminalParams } from '../claim/domain-typed-manager';
import { findDomainObject, findDomainObjects } from '../claim/domain-typed-manager/utils';
import { createShopTerminal } from '../claim/domain-typed-manager/create-shop-terminal';
import { toGenReference } from './converters';
import { ThriftService } from './thrift-service';
import * as Repository from './gen-nodejs/Repository';

const findBusinessScheduleObjects = (domain: Domain): BusinessScheduleObject[] =>
    findDomainObjects(domain, 'business_schedule');

const findProviderObjects = (domain: Domain): ProviderObject[] =>
    findDomainObjects(domain, 'provider');

const findTerminalObjects = (domain: Domain): TerminalObject[] =>
    findDomainObjects(domain, 'terminal');

const findPaymentInstitutions = (domain: Domain): PaymentInstitutionObject[] =>
    findDomainObjects(domain, 'payment_institution');

const filterByTerminalSelector = (objects: ProviderObject[], filter: 'decisions' | 'value'): ProviderObject[] => {
    return objects.filter((object) => {
        const selector = object.data.terminal;
        switch (filter) {
            case 'decisions':
                return selector.decisions;
            case 'value':
                return selector.value;
        }
    });
};

/**
 * @deprecated Old version from 'weezing'
 * TODO: Kill of
 */
@Injectable()
export class DomainTypedManager extends ThriftService {

    private domain: Observable<Domain>;

    constructor(zone: NgZone) {
        super(zone, '/v1/domain/repository', Repository);
        this.domain = this.getDomain();
    }

    checkout: (reference: any) => Observable<any> = this.toObservableAction('Checkout');

    commit: (version: any, commit: any) => Observable<any> = this.toObservableAction('Commit');

    getBusinessScheduleObjects(): Observable<BusinessScheduleObject[]> {
        return this.domain.pipe(map((domain) => findBusinessScheduleObjects(domain)));
    }

    getProviderObjects(): Observable<ProviderObject[]> {
        return this.domain.pipe(map((domain) => findProviderObjects(domain)));
    }

    getProviderObjectsWithSelector(filter: 'decisions' | 'value'): Observable<ProviderObject[]> {
        return this.getProviderObjects().pipe(map((objects) => filterByTerminalSelector(objects, filter)));
    }

    getProviderObject(id: number): Observable<ProviderObject> {
        return this.domain
            .pipe(
                map((domain) => findProviderObjects(domain)),
                map((objects) => findDomainObject(objects, id))
            );
    }

    getTerminalObjects(): Observable<TerminalObject[]> {
        return this.domain.pipe(map((domain) => findTerminalObjects(domain)));
    }

    createTerminal(params: CreateTerminalParams): Observable<Version> {
        return combineLatest(
            this.getLastVersion(),
            this.getTerminalObjects(),
            this.getProviderObject(params.providerID)
        ).pipe(switchMap(([version, terminalObjects, providerObject]) =>
            this.commit(version, createShopTerminal(terminalObjects, providerObject, params)))
        );
    }

    getLastVersion(): Observable<number> {
        return this.checkout(toGenReference()).pipe(map((snapshot) => snapshot.version));
    }

    getDomain(): Observable<Domain> {
        return this.checkout(toGenReference()).pipe(map((snapshot) => snapshot.domain));
    }

    getPaymentInstitutions(): Observable<PaymentInstitutionObject[]> {
        return this.domain
            .pipe(map((domain) => findPaymentInstitutions(domain)));
    }
}
