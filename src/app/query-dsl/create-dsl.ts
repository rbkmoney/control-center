import { QueryDSL } from './query-dsl';

export function createDsl(query: QueryDSL['query']): string {
    return JSON.stringify({ query });
}
