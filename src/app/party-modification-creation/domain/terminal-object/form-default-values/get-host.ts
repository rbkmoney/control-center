export const getHost = (shopUrl: string) => {
    let host;
    try {
        host = new URL(shopUrl).host;
    } catch (ex) {
        console.warn(ex);
    }
    return host;
};
