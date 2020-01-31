export function text(literals: TemplateStringsArray, ...placeholders: (string | number | null | undefined)[]): string {
    const resultPlaceholders = placeholders.map(p => {
        switch (p) {
            case null:
            case undefined:
                return '';
        }
        return String(p);
    });
    return resultPlaceholders.map((p, i) => literals[i] + p).join('') + literals[literals.length - 1];
}
