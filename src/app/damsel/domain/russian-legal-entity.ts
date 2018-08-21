import { RussianBankAccount } from './russian-bank-account';

export class RussianLegalEntity {
    registeredName: string;
    registeredNumber: string;
    inn: string;
    actualAddress: string;
    postAddress: string;
    representativePosition: string;
    representativeFullName: string;
    representativeDocument: string;
    russianBankAccount: RussianBankAccount;
}
