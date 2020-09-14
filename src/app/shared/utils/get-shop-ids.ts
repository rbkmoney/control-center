export const getShopIDs = (shopIDs: string | string[]): string[] => {
    if (shopIDs) {
        return !Array.isArray(shopIDs) ? [shopIDs] : shopIDs;
    }
    return null;
} ;
