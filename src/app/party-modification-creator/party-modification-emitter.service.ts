import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { PartyModification } from '../thrift-services/damsel/gen-model/claim_management';

@Injectable()
export class PartyModificationEmitter {
    private modificationCreated$: Subject<PartyModification> = new Subject();

    modification$: Observable<PartyModification> = this.modificationCreated$.asObservable();

    modificationCreated(modification: PartyModification) {
        this.modificationCreated$.next(modification);
    }
}
