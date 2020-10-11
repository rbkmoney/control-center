import identity from 'lodash-es/identity';
import pickBy from 'lodash-es/pickBy';

export const removeEmptyProperties = (s) => pickBy(s, identity);
