export const hasActiveFragments = (fragments: string[], ulrFragments: string[]): boolean => {
    if (fragments?.length) {
        return (
            ulrFragments.filter((fragment) => fragments.includes(fragment)).length ===
            fragments.length
        );
    }
    return false;
};
