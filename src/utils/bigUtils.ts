import Big from "big.js";

export function sumBigs(bigs: Big[]) {
    return bigs.reduce((prev, curr) => prev.add(curr), new Big(0));
}
