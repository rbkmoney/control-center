import { Option } from '../types';

const filterPredicate =
    <T>(searchStr: string) =>
    (option: Option<T>) =>
        option.label.toLowerCase().includes(searchStr);

export const filterOptions = <T>(options: Option<T>[], controlValue: unknown): Option<T>[] =>
    controlValue && typeof controlValue === 'string'
        ? options?.filter(filterPredicate(controlValue.toLowerCase()))
        : options;
