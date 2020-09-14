export const clearParams = (queryParams: object, filterParams: string[]): object => {
    return Object.fromEntries(
        Object.entries(queryParams).filter((param) => !filterParams.includes(param[0]))
    );
};