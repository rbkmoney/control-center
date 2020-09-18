import isNil from 'lodash-es/isNil';
import round from 'lodash-es/round';

export const toMajor = (amount: number): number => (isNil(amount) ? null : round(amount / 100, 2));
