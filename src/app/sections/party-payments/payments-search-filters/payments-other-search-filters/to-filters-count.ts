import { SearchFiltersParams } from '../search-filters-params';

export const toFiltersCount = (keys: string[]) => (p: Partial<SearchFiltersParams>): number =>
    Object.keys(p).filter((k) => keys.includes(k)).length || null;
