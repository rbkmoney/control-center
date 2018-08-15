import { DomainObject } from '../domain';

export class UpdateOp {
    oldObject: DomainObject;
    newObject: DomainObject;
}
