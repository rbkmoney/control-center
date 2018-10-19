import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccThriftInt64'
})
export class ThriftInt64Pipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        return this.toNumber(value.buffer, value.offset);
    }

    private toNumber(buffer: object, offset: number, allowImprecise = false) {
        const b = buffer, o = offset;
        // Running sum of octets, doing a 2's complement
        let negate = b[o] & 0x80, x = 0, carry = 1;
        for (let i = 7, m = 1; i >= 0; i--, m *= 256) {
            let v = b[o + i];
            // 2's complement for negative numbers
            if (negate) {
                v = (v ^ 0xff) + carry;
                carry = v >> 8;
                v = v & 0xff;
            }
            x += v * m;
        }
        // Return Infinity if we've lost integer precision
        const MAX_INT = Math.pow(2, 53);
        if (!allowImprecise && x >= MAX_INT) {
            return negate ? -Infinity : Infinity;
        }
        return negate ? -x : x;
    }
}
