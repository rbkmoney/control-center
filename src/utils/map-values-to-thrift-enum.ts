// Thrift enum ex: [{ enumVal: {} }, ...]
const toThriftEnum = (arr: string[]) => arr.reduce((acc, cv) => [...acc, { [cv]: {} }], []);

export const mapValuesToThriftEnum = (obj: {}): {} =>
    Object.entries(obj).reduce((acc, [k, v]) => ({ ...acc, [k]: toThriftEnum(v as string[]) }), {});
