// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as domain from "./domain";
export type Version = Int64;
export type Limit = number;
export type History = Map<Version, Commit>;
export interface Head {}

export interface Snapshot {
  version: Version;
  domain: domain.Domain;
}

export interface Commit {
  ops: Operation[];
}

export interface InsertOp {
  object: domain.DomainObject;
}

export interface UpdateOp {
  old_object: domain.DomainObject;
  new_object: domain.DomainObject;
}

export interface RemoveOp {
  object: domain.DomainObject;
}

export interface VersionedObject {
  version: Version;
  object: domain.DomainObject;
}

export interface ObjectAlreadyExistsConflict {
  object_ref: domain.Reference;
}

export interface ObjectNotFoundConflict {
  object_ref: domain.Reference;
}

export interface ObjectReferenceMismatchConflict {
  object_ref: domain.Reference;
}

export interface ObjectsNotExistConflict {
  object_refs: NonexistantObject[];
}

export interface NonexistantObject {
  object_ref: domain.Reference;
  referenced_by: domain.Reference[];
}

export interface Reference {
  version?: Version;
  head?: Head;
}

export interface Operation {
  insert?: InsertOp;
  update?: UpdateOp;
  remove?: RemoveOp;
}

export interface Conflict {
  object_already_exists?: ObjectAlreadyExistsConflict;
  object_not_found?: ObjectNotFoundConflict;
  object_reference_mismatch?: ObjectReferenceMismatchConflict;
  objects_not_exist?: ObjectsNotExistConflict;
}

export type VersionNotFound = {};

export type ObjectNotFound = {};

export type OperationConflict = {
  conflict: Conflict;
};

export type ObsoleteCommitVersion = {};
