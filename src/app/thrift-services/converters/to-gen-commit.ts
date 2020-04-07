import { Commit, InsertOp, Operation, RemoveOp, UpdateOp } from '../damsel/gen-model/domain_config';
import * as DomainConfigTypes from '../damsel/gen-nodejs/domain_config_types';

const toGenInsertOp = (insertOp: InsertOp) => {
    const insertOpGen = new DomainConfigTypes.InsertOp();
    insertOpGen.object = insertOp.object;
    return insertOpGen;
};

const toGenUpdateOp = (updateOp: UpdateOp) => {
    const updateOpGen = new DomainConfigTypes.UpdateOp();
    updateOpGen.old_object = updateOp.old_object;
    updateOpGen.new_object = updateOp.new_object;
    return updateOpGen;
};

const toGenRemoveOp = (removeOp: RemoveOp) => {
    const removeOpGen = new DomainConfigTypes.RemoveOp();
    removeOpGen.object = removeOp.object;
    return removeOpGen;
};

const toGenOperation = (operation: Operation) => {
    const operationGen = new DomainConfigTypes.Operation();
    if (operation.insert) {
        operationGen.insert = toGenInsertOp(operation.insert);
    } else if (operation.update) {
        operationGen.update = toGenUpdateOp(operation.update);
    } else if (operation.remove) {
        operationGen.remove = toGenRemoveOp(operation.remove);
    }
    return operationGen;
};

const toGenCommitOps = (operations: Operation[]) =>
    operations.map((operation) => toGenOperation(operation));

export const toGenCommit = (commit: Commit) => {
    const genCommit = new DomainConfigTypes.Commit();
    genCommit.ops = toGenCommitOps(commit.ops);
    return genCommit;
};
