export function createStyleElement(url: string): HTMLLinkElement {
    const styleElement = document.createElement('link');
    styleElement.href = url;
    styleElement.rel = 'stylesheet';
    return styleElement;
}
