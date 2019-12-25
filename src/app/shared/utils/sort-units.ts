import * as moment from 'moment';
import { ModificationUnit } from '../../gen-damsel/claim_management';

export const sortUnitsByCreatedAtAsc = <T extends ModificationUnit>(units: T[]): T[] =>
    units.slice().sort(({ created_at: a }, { created_at: b }) => moment(a).diff(moment(b)));
