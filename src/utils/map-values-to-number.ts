import toNumber from 'lodash-es/toNumber';

export const mapValuesToNumber = (obj: {}): {} =>
    Object.entries(obj).reduce((acc, [k, v]) => ({ ...acc, [k]: toNumber(v) }), {});
