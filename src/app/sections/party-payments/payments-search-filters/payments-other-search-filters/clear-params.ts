import pickBy from 'lodash-es/pickBy';

export const clearParams = (params: object, paramsToSave: string[]): object => {
    return pickBy(params, (v, k) => paramsToSave.includes(k));
};
