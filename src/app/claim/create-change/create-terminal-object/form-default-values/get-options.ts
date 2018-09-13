import { getVtbTemplateOptions } from './get-vtb-template-options';
import { getTcsTemplateOptions } from './get-tcs-template-options';
import { getRietTemplateOptions } from './get-riet-template-options';
import { getSngbTemplateOptions } from './get-sngb-template-options';
import { TerminalOption } from '../../../../thrift/domain/domain-typed-manager';
import { DomainModificationInfo } from '../../../model';

export const getOptions = (option: string, param: DomainModificationInfo): TerminalOption[] => {
    const {shopUrl, partyId} = param;
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
