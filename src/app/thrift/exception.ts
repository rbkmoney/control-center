export type  Exception<N = string, T = {}> = {
    name: N;
    message: string;
} & T;
