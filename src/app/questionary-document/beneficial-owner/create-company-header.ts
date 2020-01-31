import { cmToIn, Content } from '../../document';
import { createCaptionedText } from '../create-content';

export function createCompanyHeader(companyName: string, companyInn: string): Content {
    return {
        columns: [
            { ...createCaptionedText(companyName, 'Наименование вашей компании'), width: 'auto' },
            { ...createCaptionedText(companyInn, 'ИНН'), width: 'auto' }
        ],
        columnGap: cmToIn(2)
    };
}
