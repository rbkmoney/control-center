import { getVtbTemplateOptions } from './get-vtb-template-options';
import { getTcsTemplateOptions } from './get-tcs-template-options';
import { getRietTemplateOptions } from './get-riet-template-options';
import { getSngbTemplateOptions } from './get-sngb-template-options';
import { DomainModificationInfo } from '../../model';
import { TerminalOption } from '../../../thrift';

export const getOptions = (option: string, params: DomainModificationInfo): TerminalOption[] => {
    const { shop_url, party_id } = params;
    let options = [{ key: '', value: '' }];
    switch (option) {
        case 'VTB':
            options = getVtbTemplateOptions(shop_url, party_id);
            break;
        case 'TCS':
            options = getTcsTemplateOptions(shop_url);
            break;
        case 'RIET':
            options = getRietTemplateOptions();
            break;
        case 'SNGB':
            options = getSngbTemplateOptions();
            break;
    }
    return options;
};
