// Thrift enum ex: [{ enumVal: {} }, ...]
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return
const toThriftEnum = (arr: string[]) => arr.reduce((acc, cv) => [...acc, { [cv]: {} }], []);

export const mapValuesToThriftEnum = (obj: any): any =>
    Object.entries(obj).reduce((acc, [k, v]) => ({ ...acc, [k]: toThriftEnum(v as string[]) }), {});
