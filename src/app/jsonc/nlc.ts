function isDefined(value: any): boolean {
    return typeof value !== 'undefined';
}

export enum MessageFormat {
    file = 'file',
    bundle = 'bundle',
    both = 'both'
}

export interface Options {
    locale?: string;
    cacheLanguageResolution?: boolean;
    messageFormat?: MessageFormat;
}

export interface LocalizeInfo {
    key: string;
    comment: string[];
}

namespace LocalizeInfo {
    export function is(value: any): value is LocalizeInfo {
        const candidate = value as LocalizeInfo;
        return candidate && isDefined(candidate.key) && isDefined(candidate.comment);
    }
}

export type LocalizeFunc = (
    key: string | LocalizeInfo,
    message: string,
    ...args: (string | number | boolean | undefined | null)[]
) => string;

export type LoadFunc = (file?: string) => LocalizeFunc;

interface NlsBundle {
    [key: string]: string[];
}

export type KeyInfo = string | LocalizeInfo;

function format(message: string, args: any[]): string {
    let result: string;
    if (args.length === 0) {
        result = message;
    } else {
        result = message.replace(/\{(\d+)\}/g, (match, rest) => {
            const index = rest[0];
            const arg = args[index];
            let replacement = match;
            if (typeof arg === 'string') {
                replacement = arg;
            } else if (
                typeof arg === 'number' ||
                typeof arg === 'boolean' ||
                arg === void 0 ||
                arg === null
            ) {
                replacement = String(arg);
            }
            return replacement;
        });
    }
    return result;
}

function localize(key: string | LocalizeInfo, message: string, ...args: any[]): string {
    return format(message, args);
}

export function loadMessageBundle(file?: string): LocalizeFunc {
    if (!file) {
        return localize;
    }
}
