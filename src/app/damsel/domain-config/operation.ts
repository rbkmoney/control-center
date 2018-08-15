import { InsertOp } from './insert-op';
import { UpdateOp } from './update-op';
import { RemoveOp } from './remove-op';

export class Operation {
    insert?: InsertOp;
    update?: UpdateOp;
    remove?: RemoveOp;
}
