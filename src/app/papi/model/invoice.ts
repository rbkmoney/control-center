import { Cart } from './cart';

export class Invoice {
    id: string;
    ownerId: string;
    shopId: string;
    createdAt: string;
    status: object;
    product: string;
    description: string;
    due: string;
    amount: number;
    currencySymbolicCode: string;
    cart: Cart;
}
