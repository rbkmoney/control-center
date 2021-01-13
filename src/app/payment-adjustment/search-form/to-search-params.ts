import { SearchFormParams } from './search-form-params';

export const toSearchParams = (formValue: any): SearchFormParams => {
    const { fromTime, toTime, invoiceIds } = formValue;
    return {
        ...formValue,
        invoiceIds: invoiceIds ? invoiceIds.replace(/\s/g, '').split(',') : '',
        fromTime: fromTime ? fromTime.startOf('day').toISOString() : '',
        toTime: toTime ? toTime.endOf('day').toISOString() : '',
    };
};
