import pickBy from 'lodash-es/pickBy';

export const filterParams = (params: object, paramsToFilter: string[]): object => {
    return pickBy(params, (v, k) => !paramsToFilter.includes(k));
};
