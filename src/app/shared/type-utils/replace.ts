export type Replace<T, K> = Omit<T, keyof K> & K;
