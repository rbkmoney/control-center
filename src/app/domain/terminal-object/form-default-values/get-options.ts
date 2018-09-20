import { getVtbTemplateOptions } from './get-vtb-template-options';
import { getTcsTemplateOptions } from './get-tcs-template-options';
import { getRietTemplateOptions } from './get-riet-template-options';
import { getSngbTemplateOptions } from './get-sngb-template-options';
import { TerminalOption } from '../../domain-typed-manager';
import { DomainModificationInfo } from '../../../claim/model';

export const getOptions = (option: string, params: DomainModificationInfo): TerminalOption[] => {
    const {shopUrl, partyId} = params;
    let options = [{key: '', value: ''}];
    switch (option) {
        case 'VTB':
            options = getVtbTemplateOptions(shopUrl, partyId);
            break;
        case 'TCS':
            options = getTcsTemplateOptions(shopUrl);
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
