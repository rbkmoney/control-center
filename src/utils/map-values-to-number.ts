import toNumber from 'lodash-es/toNumber';

export const mapValuesToNumber = (obj: any): any =>
    Object.entries(obj).reduce((acc, [k, v]) => ({ ...acc, [k]: toNumber(v) }), {});
