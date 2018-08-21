import { getHost } from './get-host';

export const prepareTerminalName = (bankOption: string, shopUrl: string) => `${bankOption} / ${getHost(shopUrl)}`;
