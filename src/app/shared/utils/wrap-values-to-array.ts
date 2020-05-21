export const wrapValuesToArray = (params: {}): {} =>
    Object.entries(params).reduce((acc, [k, v]) => ({ ...acc, [k]: [v] }), {});
