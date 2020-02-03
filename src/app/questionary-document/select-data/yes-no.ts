export enum YesNo {
    yes,
    no
}

export function toYesNo(value: boolean): YesNo {
    if (value === null || value === undefined) {
        return -1;
    }
    return value ? YesNo.yes : YesNo.no;
}
