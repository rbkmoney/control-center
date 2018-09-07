import { Price } from './price';

export class CartLine {
    product: string;
    quantity: number;
    price: Price;
    metadata: any[];
}
