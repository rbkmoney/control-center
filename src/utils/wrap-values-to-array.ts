export const wrapValuesToArray = (params: any): any =>
    Object.entries(params).reduce((acc, [k, v]) => ({ ...acc, [k]: [v] }), {});
