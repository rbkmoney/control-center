import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
];

@Injectable()
export class DepositsTableService {
    form = this.fb.group({
        destination: ['', Validators.required],
        amount: ['', [Validators.required, Validators.pattern(/^\d+([\,\.]\d{1,2})?$/)]],
        currency: [currencies[0], Validators.required],
    });

    constructor(private fb: FormBuilder) {}
}
