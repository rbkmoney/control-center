import { getHost } from './get-host';
import { TerminalOption } from '../../../thrift/operations';

export const getTcsTemplateOptions = (shopUrl: string): TerminalOption[] => [
    {
        key: 'terminalIdNon3ds',
        value: ''
    },
    {
        key: 'terminalId3ds',
        value: ''
    },
    {
        key: 'submerchantId',
        value: ''
    },
    {
        key: 'mpiEnable',
        value: 'true'
    },
    {
        key: 'merchantId',
        value: ''
    },
    {
        key: 'merchantName',
        value: getHost(shopUrl)
    },
    {
        key: 'merchantUrl',
        value: shopUrl
    }
];
