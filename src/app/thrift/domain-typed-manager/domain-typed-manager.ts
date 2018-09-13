import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/internal/operators';

import {
    Domain,
    BusinessScheduleObject,
    ProviderObject,
    TerminalObject
} from '../../damsel/domain/index';
import { Version } from '../../damsel/index';
import { DmtService } from '../dmt.service';
import { CreateTerminalParams } from './create-terminal-params';
import { findDomainObject, findDomainObjects } from './utils';
import { createShopTerminal } from './create-shop-terminal';
import { toGenReference } from './gen-conversion/index';

const findBusinessScheduleObjects = (domain: Domain): BusinessScheduleObject[] =>
    findDomainObjects(domain, 'business_schedule');

const findProviderObjects = (domain: Domain): ProviderObject[] =>
    findDomainObjects(domain, 'provider');

const findTerminalObjects = (domain: Domain): TerminalObject[] =>
    findDomainObjects(domain, 'terminal');

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

@Injectable()
export class DomainTypedManager {

    private domain: Observable<Domain>;

    constructor(private dmtService: DmtService) {
        this.domain = this.dmtService
            .checkout(toGenReference())
            .pipe(map((snapshot) => snapshot.domain));
    }

    getBusinessScheduleObjects(): Observable<BusinessScheduleObject[]> {
        return this.domain
            .pipe(map((domain) => findBusinessScheduleObjects(domain)));
    }

    getBusinessScheduleObject(id: number): Observable<BusinessScheduleObject> {
        return this.domain
            .pipe(
                map((domain) => findBusinessScheduleObjects(domain)),
                map((objects) => findDomainObject(objects, id))
            );
    }

    getProviderObjects(): Observable<ProviderObject[]> {
        return this.domain
            .pipe(map((domain) => findProviderObjects(domain)));
    }

    getProviderObjectsWithSelector(filter: 'decisions' | 'value'): Observable<ProviderObject[]> {
        return this.getProviderObjects()
            .pipe(map((objects) => filterByTerminalSelector(objects, filter)));
    }

    getProviderObject(id: number): Observable<ProviderObject> {
        return this.domain
            .pipe(
                map((domain) => findProviderObjects(domain)),
                map((objects) => findDomainObject(objects, id))
            );
    }

    getTerminalObjects(): Observable<TerminalObject[]> {
        return this.domain
            .pipe(map((domain) => findTerminalObjects(domain)));
    }

    createTerminal(params: CreateTerminalParams): Observable<Version> {
        return combineLatest(
            this.getLastVersion(),
            this.getTerminalObjects(),
            this.getProviderObject(params.providerID)
        ).pipe(switchMap(([version, terminalObjects, providerObject]) =>
            this.dmtService.commit(version, createShopTerminal(terminalObjects, providerObject, params))));
    }

    getLastVersion(): Observable<number> {
        return this.dmtService
            .checkout(toGenReference())
            .pipe(map((snapshot) => snapshot.version));
    }
}
