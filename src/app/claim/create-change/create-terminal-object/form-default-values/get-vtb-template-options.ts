import last from 'lodash-es/last';
import { getHost } from './get-host';
import { TerminalOption } from '../../../domain-typed-manager';

const partyIDToSmid = (partyID: string) => last(partyID.split('-'));

const prepareMerchantName = (shopUrl: string) => `${getHost(shopUrl)}@RBKmoney`;

export const getVtbTemplateOptions = (shopUrl: string, partyID: string): TerminalOption[] =>
    ([
        {
            key: 'PFSNAME',
            value: ''
        },
        {
            key: 'SMADDRESS',
            value: ''
        },
        {
            key: 'SMCITY',
            value: ''
        },
        {
            key: 'SMID',
            value: partyIDToSmid(partyID)
        },
        {
            key: 'SMMCC',
            value: ''
        },
        {
            key: 'SMPOSTCODE',
            value: ''
        },
        {
            key: 'merchant_id',
            value: ''
        },
        {
            key: 'merchant_name',
            value: prepareMerchantName(shopUrl)
        },
        {
            key: 'term_id',
            value: ''
        }
    ]);
