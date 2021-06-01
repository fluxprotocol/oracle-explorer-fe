import format from "date-fns/format";

export function prettyFormatDate(date: Date): string {
    return format(date, 'MMMM d, yyyy HH:mm:ss');
}

/**
 * converts nano seconds to milliseconds
 *
 * @export
 * @param {number} nanoSeconds
 * @return {number}
 */
export function nsToMs(nanoSeconds: number): number {
    return nanoSeconds / 1000000;
}

/**
 * Formats a time number to a human readable format
 *
 * @export
 * @param {number} number
 * @param {('sec' | 'ms')} unit
 */
export function formatTimeToReadable(number: number, unit: 'sec' | 'ms' | 'ns') {
    let s = 0;

    if (unit === 'sec') {
        s = number
    } else if (unit === 'ns') {
        s = Math.floor(number / 1000000000);
    } else {
        s = Math.floor(number / 1000)
    }

    let m = Math.floor(s / 60)
    s = s % 60
    let h = Math.floor(m / 60)
    m = m % 60
    const d = Math.floor(h / 24)
    h = h % 24

    return { days: d, hours: h, minutes: m, seconds: s }
}
