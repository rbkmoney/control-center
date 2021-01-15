import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, switchMap, take } from 'rxjs/operators';

import { DomainCacheService } from '../domain-cache.service';
import { CreateTerminalParams, getCreateTerminalCommit } from '../operations';

@Injectable()
export class TerminalService {
    constructor(private domainCacheService: DomainCacheService) {}

    createTerminal(params: CreateTerminalParams): Observable<number> {
        return this.domainCacheService.getObjects('terminal').pipe(
            take(1),
            switchMap((terminalObjects) => {
                const { commit, id } = getCreateTerminalCommit(terminalObjects, params);
                return this.domainCacheService.commit(commit).pipe(mapTo(id));
            })
        );
    }
}
