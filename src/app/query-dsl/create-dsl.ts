import { QueryDsl } from './query-dsl';

export function createDsl(query: QueryDsl['query']): string {
    return JSON.stringify({ query });
}
