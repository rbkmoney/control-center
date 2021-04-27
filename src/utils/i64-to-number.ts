export const i64ToNumber = (buffer: any, offset: number, allowImprecise = false) => {
    const b = buffer;
    const o = offset;
    // Running sum of octets, doing a 2's complement
    // eslint-disable-next-line no-bitwise
    const negate = b[o] & 0x80;
    let x = 0;
    let carry = 1;
    for (let i = 7, m = 1; i >= 0; i--, m *= 256) {
        let v = b[o + i];
        // 2's complement for negative numbers
        if (negate) {
            // eslint-disable-next-line no-bitwise
            v = (v ^ 0xff) + carry;
            // eslint-disable-next-line no-bitwise
            carry = v >> 8;
            // eslint-disable-next-line no-bitwise
            v = v & 0xff;
        }
        x += v * m;
    }
    // Return Infinity if we've lost integer precision
    const maxInt = Math.pow(2, 53);
    if (!allowImprecise && x >= maxInt) {
        return negate ? -Infinity : Infinity;
    }
    return negate ? -x : x;
};
