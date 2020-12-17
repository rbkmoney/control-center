import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { DomainCacheService } from './domain-cache.service';
import { CreateTerminalParams, getCreateTerminalCommit } from './operations';

/**
 * @deprecated should be removed, use DomainCacheService
 * CREATE SEPARATE SERVICES FOR EACH DOMAIN OBJECT
 */
@Injectable()
export class DomainTypedManager {
    constructor(private domainCacheService: DomainCacheService) {}

    /**
     * @deprecated select in separate service
     */
    createTerminal(params: CreateTerminalParams): Observable<number> {
        let newTerminalID = null;
        return this.domainCacheService.getObjects('terminal').pipe(
            take(1),
            switchMap((terminalObjects) => {
                const { commit, id } = getCreateTerminalCommit(terminalObjects, params);
                newTerminalID = id;
                return this.domainCacheService.commit(commit);
            }),
            map(() => newTerminalID)
        );
    }
}
