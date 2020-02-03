import * as moment from 'moment';

export function getDate(date: string): string {
    return date
        ? moment(date)
              .locale('ru')
              .utc()
              .format('L')
        : null;
}
