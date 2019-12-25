export const getUnionKey = (union: any) => Object.entries(union).find(([, v]) => !!v)[0];
