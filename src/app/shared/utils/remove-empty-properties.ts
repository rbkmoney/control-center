export const removeEmptyProperties = <T>(s: T) =>
    Object.keys(s).reduce(
        (acc, cur) => (!!s[cur] && s[cur] !== '' ? { ...acc, [cur]: s[cur] } : acc),
        {} as T
    );
