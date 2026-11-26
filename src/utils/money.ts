export function toPaise(amount: string): bigint {

    const [rupees, decimal = ""] = amount.split(".");

    const paise = decimal.padEnd(2, "0");

    return BigInt(rupees) * 100n + BigInt(paise);
}


export function fromPaise(value: bigint): string {

    const rupees = value / 100n;

    const paise = value % 100n;

    return `${rupees}.${paise.toString().padStart(2, "0")}`;
}