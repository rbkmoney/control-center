export interface CurrencySource {
    source: string;
    currency: string;
}

export const currencies: CurrencySource[] = [
    { source: '3', currency: 'RUB' },
    { source: '5', currency: 'UAH' },
    { source: 'eskin1', currency: 'USD' },
    { source: 'eskin2', currency: 'EUR' },
    { source: 'eskin3', currency: 'KZT' },
    { source: 'eskin5', currency: 'BYN' },
    { source: '667c1494-a334-4cd4-b350-712917fc6f8e', currency: 'UZS' },
];
