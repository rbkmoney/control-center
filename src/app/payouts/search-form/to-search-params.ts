import isString from 'lodash-es/isString';
import reduce from 'lodash-es/reduce';
import toNumber from 'lodash-es/toNumber';
import toString from 'lodash-es/toString';
import * as moment from 'moment';

import { PayoutSearchParams } from '../../papi/params';

export const formValueToSearchParams = (formValues: any): PayoutSearchParams => {
    return reduce(
        formValues,
        (acc, value, key) => {
            if (key === 'fromTime') {
                return value
                    ? {
                          ...acc,
                          [key]: moment(value).startOf('day').utc().format(),
                      }
                    : acc;
            }
            if (key === 'toTime') {
                return value
                    ? {
                          ...acc,
                          [key]: moment(value).endOf('day').utc().format(),
                      }
                    : acc;
            }
            if (key === 'minAmount' || key === 'maxAmount') {
                return value
                    ? {
                          ...acc,
                          [key]:
                              toNumber(toString(value).replace(/\s/g, '').replace(/,/g, '.')) * 100,
                      }
                    : acc;
            }
            if (key === 'currencyCode') {
                return value ? { ...acc, [key]: value.toUpperCase() } : acc;
            }
            if (value === '') {
                return acc;
            }
            if (isString(value)) {
                value = value.trim();
                if (/,/g.test(value)) {
                    value = value.replace(/\s/g, '').split(',');
                    if (value[value.length - 1] === '') {
                        value = value.slice(0, -1).join(',');
                    }
                }
                return { ...acc, [key]: value };
            }
        },
        {}
    );
};
