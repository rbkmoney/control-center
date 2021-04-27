export enum YesNo {
    Yes,
    No,
}

export function toYesNo(value: boolean): YesNo {
    if (value === null || value === undefined) {
        return -1;
    }
    return value ? YesNo.Yes : YesNo.No;
}
