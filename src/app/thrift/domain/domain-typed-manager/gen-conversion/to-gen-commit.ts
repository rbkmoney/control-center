import * as DomainConfigTypes from '../../../gen-nodejs/domain_config_types';
import { Commit, InsertOp, Operation, UpdateOp } from '../../../../damsel/index';

const toGenInsertOp = (insertOp: InsertOp): InsertOp => {
    const insertOpGen = new DomainConfigTypes.InsertOp();
    insertOpGen.object = insertOp.object;
    return insertOpGen;
};

const toGenUpdateOp = (updateOp: UpdateOp): UpdateOp => {
    const updateOpGen = new DomainConfigTypes.UpdateOp();
    updateOpGen.old_object = updateOp.oldObject;
    updateOpGen.new_object = updateOp.newObject;
    return updateOpGen;
};

const toGenOperation = (operation: Operation): Operation => {
    const operationGen = new DomainConfigTypes.Operation();
    if (operation.insert) {
        operationGen.insert = toGenInsertOp(operation.insert);
    } else if (operation.update) {
        operationGen.update = toGenUpdateOp(operation.update);
    }
    return operationGen;
};

const toGenCommitOps = (operations: Operation[]): Operation[] =>
    operations.map((operation) => toGenOperation(operation));

export const toGenCommit = (commit: Commit): Commit => {
    const genCommit = new DomainConfigTypes.Commit();
    genCommit.ops = toGenCommitOps(commit.ops);
    return genCommit;
};
