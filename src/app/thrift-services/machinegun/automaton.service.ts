import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';
import { ThriftService } from '../thrift-service';
import { Namespace } from './gen-model/base';
import { Machine, MachineDescriptor, Reference } from './gen-model/state_processing';
import * as Automaton from './gen-nodejs/Automaton';
import {
    MachineDescriptor as MachineDescriptorObject,
    Reference as ReferenceObject
} from './gen-nodejs/state_processing_types';

@Injectable()
export class AutomatonService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/automaton', Automaton);
    }

    simpleRepair = (ns: Namespace, ref: Reference): Observable<void> =>
        this.toObservableAction('SimpleRepair')(ns, new ReferenceObject(ref));

    getMachine = (desc: MachineDescriptor): Observable<Machine> =>
        this.toObservableAction('GetMachine')(new MachineDescriptorObject(desc));
}
