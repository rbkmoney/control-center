import isEmpty from 'lodash-es/isEmpty';

export function getPercent(value: string | number): string {
    return isEmpty(value) ? null : `${value}%`;
}
