import { Content, FontFamily } from '../../../../document';

interface SourceIcons {
    [name: string]: string;
}

type Icons<T extends SourceIcons> = Record<keyof T, Content>;

export function createIcons<T extends SourceIcons, R = Icons<T>>(iconsObj: T): R {
    return Object.entries(iconsObj).reduce((acc, [name, text]) => {
        acc[name] = {
            text,
            style: {
                font: FontFamily.Fa,
            },
        };
        return acc;
    }, {} as R);
}
