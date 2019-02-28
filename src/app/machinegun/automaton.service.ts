import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import * as Automaton from './gen-nodejs/Automaton';
import { Reference as ReferenceObject } from './gen-nodejs/state_processing_types';
import { ThriftService } from '../thrift';
import { Namespace } from './gen-model/base';
import { Reference } from './gen-model/state_processing';

@Injectable()
export class AutomatonService extends ThriftService {
    constructor(zone: NgZone) {
        super(zone, '/v1/automaton', Automaton);
    }

    simpleRepair = (ns: Namespace, ref: Reference): Observable<void> =>
        this.toObservableAction('SimpleRepair')(ns, new ReferenceObject(ref));
}
