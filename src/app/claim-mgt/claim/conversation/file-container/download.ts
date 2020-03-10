/**
 * https://github.com/sindresorhus/multi-download/blob/master/index.js
 */
export function download(url: string, name?: string): void {
    const a = document.createElement('a');
    a.download = name;
    a.href = url;
    a.style.display = 'none';
    document.body.append(a);
    a.click();
    // Chrome requires the timeout
    setTimeout(() => {
        a.remove();
    }, 100);
}
