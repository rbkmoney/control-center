export interface FetchAction<P extends any = any> {
    type: 'search' | 'fetchMore';
    value?: P;
}
