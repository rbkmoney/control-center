import { InternationalBankDetails } from './international-bank-details';

export class InternationalBankAccount {
    // common
    number?: string;
    bank?: InternationalBankDetails;
    correspondentAccount?: InternationalBankAccount;

    // sources
    iban?: string;

    // deprecated
    accountHolder?: string;
    bic?: string;
    bankName?: string;
    bankAddress?: string;
}
