import { RadioButtonObject } from '@cc/components/utils';

export const PAYMENT_STATUSES: RadioButtonObject[] = [
    {
        value: 'captured',
        title: 'Captured',
    },
    {
        value: 'failed',
        title: 'Failed',
    },
    {
        value: 'pending',
        title: 'Pending',
    },
    {
        value: 'processed',
        title: 'Processed',
    },
    {
        value: 'cancelled',
        title: 'Cancelled',
    },
    {
        value: 'refunded',
        title: 'Refunded',
    },
];

export const PAYMENT_METHODS: RadioButtonObject[] = [
    {
        value: 'bank_card',
        title: 'Bank Card',
    },
    {
        value: 'terminal',
        title: 'Terminal',
    },
    {
        value: 'mobile',
        title: 'Mobile Commerce',
    },
];

export const TOKEN_PROVIDERS: RadioButtonObject[] = [
    {
        value: 'applepay',
        title: 'Apple Pay',
    },
    {
        value: 'googlepay',
        title: 'Google Pay',
    },
    {
        value: 'samsungpay',
        title: 'Mobile Commerce',
    },
];

export const PAYMENT_SYSTEMS: RadioButtonObject[] = [
    {
        value: 'visa',
        title: 'Visa',
    },
    {
        value: 'mastercard',
        title: 'Mastercard',
    },
    {
        value: 'visaelectron',
        title: 'Visa Electron',
    },
    {
        value: 'maestro',
        title: 'Maestro',
    },
    {
        value: 'forbrugsforeningen',
        title: 'Forbrugsforeningen',
    },
    {
        value: 'dankort',
        title: 'Dankort',
    },
    {
        value: 'amex',
        title: 'Amex',
    },
    {
        value: 'dinersclub',
        title: 'Dinersclub',
    },
    {
        value: 'discover',
        title: 'Discover',
    },
    {
        value: 'unionpay',
        title: 'UnionPay',
    },
    {
        value: 'jcb',
        title: 'JCB',
    },
    {
        value: 'nspkmir',
        title: 'NSPK Mir',
    },
];
