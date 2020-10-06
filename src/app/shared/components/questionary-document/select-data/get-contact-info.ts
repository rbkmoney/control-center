import { toOptional } from '@cc/utils/to-optional';

import { ContactInfo } from '../../../../thrift-services/ank/gen-model/questionary';

export function getContactInfo(contactInfo: ContactInfo): string {
    const { phone_number, email } = toOptional(contactInfo);
    return [phone_number, email].filter((i) => i).join(', ');
}
