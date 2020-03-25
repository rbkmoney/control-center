export const convertFormValueToParams = (params: {}) => {
    const result = {};
    for (const k in params) {
        if (params.hasOwnProperty(k)) {
            if (result[k] && k === 'statuses') {
                console.log(k, 'k');
                result[k] = (params[k] as string[]).reduce((acc, cv) => [...acc, { [cv]: {} }], []);
            } else if (result[k] && k === 'claim_id') {
                result[k] = parseInt(params[k]);
            } else if (params[k]) {
                if (params[k] === '') {
                    break;
                }
                result[k] = params[k];
            }
        }
    }
    return result;
};
