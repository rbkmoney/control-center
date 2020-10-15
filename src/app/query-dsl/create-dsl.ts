import { QueryDSL } from './query-dsl';

export function createDSL(query: QueryDSL['query']): string {
    return JSON.stringify({ query });
}
