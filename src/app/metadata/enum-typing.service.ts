import isNumber from 'lodash-es/isNumber';

import { MetadataEnum } from './model/metadata-enum.class';
import { MetadataEnumMember } from './model/metadata-enum-member.class';

export class EnumTypingService {
    public static typingEnums(enums: any[]): MetadataEnum[] {
        return enums.map((enumItem) => this.typingEnum(enumItem));
    }

    private static typingEnum(enumItem: any): MetadataEnum {
        const result = new MetadataEnum();
        if (enumItem.name) {
            result.name = enumItem.name;
        }
        if (enumItem.members) {
            result.members = enumItem.members.map((member) => this.typingEnumMember(member));
        }
        return result;
    }

    private static typingEnumMember(enumMember: any): MetadataEnumMember {
        const result = new MetadataEnumMember();
        if (enumMember.name) {
            result.name = enumMember.name;
        }
        if (isNumber(enumMember.value)) {
            result.value = enumMember.value;
        }
        if (enumMember.doc) {
            result.doc = enumMember.doc;
        }
        return result;
    }
}
