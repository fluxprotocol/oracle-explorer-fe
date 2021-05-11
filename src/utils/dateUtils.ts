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
