import { SearchFiltersParams } from '../search-filters-params';

export const countActiveFilters = (filters: SearchFiltersParams, formFields: string[]): number => {
    const paramsFields = Object.keys(filters);
    return paramsFields.reduce((acc, curr) => (formFields.includes(curr) ? ++acc : acc), 0) || null;
};
