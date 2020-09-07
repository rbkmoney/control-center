import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toStatus',
})
export class ToStatusPipe implements PipeTransform {
    transform(status: object): string {
        return getStatus(status);
    }
}

export const getStatus = (status: object): string => {
    return Object.entries(status).filter((entry) => !!entry[1])[0][0];
};
