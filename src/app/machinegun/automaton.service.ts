import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

import * as Automaton from './gen-nodejs/Automaton';
import {
    Reference as ReferenceObject,
    MachineDescriptor as MachineDescriptorObject
} from './gen-nodejs/state_processing_types';
import { ThriftService } from '../thrift';
import { Namespace } from './gen-model/base';
import { Reference, MachineDescriptor, Machine } from './gen-model/state_processing';

@Injectable()
export class AutomatonService extends ThriftService {
    constructor(zone: NgZone, keycloakService: KeycloakService) {
        super(zone, keycloakService, '/v1/automaton', Automaton);
    }

    simpleRepair = (ns: Namespace, ref: Reference): Observable<void> =>
        this.toObservableAction('SimpleRepair')(ns, new ReferenceObject(ref));

    getMachine = (desc: MachineDescriptor): Observable<Machine> =>
        this.toObservableAction('GetMachine')(new MachineDescriptorObject(desc));
}
