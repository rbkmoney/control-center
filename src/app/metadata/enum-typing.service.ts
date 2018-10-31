import * as _ from 'lodash';

import { MetadataEnum } from './model/metadata-enum.class';
import { MetadataEnumMember } from './model/metadata-enum-member.class';

export class EnumTypingService {

    public static typingEnums(enums: any[]): MetadataEnum[] {
        const result: MetadataEnum[] = [];
        _.forEach(enums, (enumItem) => result.push(this.typingEnum(enumItem)));
        return result;
    }

    private static typingEnum(enumItem: any): MetadataEnum {
        const result = new MetadataEnum();
        if (enumItem.name) {
            result.name = enumItem.name;
        }
        if (enumItem.members) {
            result.members = this.typingEnumMembers(enumItem.members);
        }
        return result;
    }

    private static typingEnumMembers(enumMembers: any[]): MetadataEnumMember[] {
        const result: MetadataEnumMember[] = [];
        _.forEach(enumMembers, (enumMember) => result.push(this.typingEnumMember(enumMember)));
        return result;
    }

    private static typingEnumMember(enumMember: any): MetadataEnumMember {
        const result = new MetadataEnumMember();
        if (enumMember.name) {
            result.name = enumMember.name;
        }
        if (_.isNumber(enumMember.value)) {
            result.value = enumMember.value;
        }
        if (enumMember.doc) {
            result.doc = enumMember.doc;
        }
        return result;
    }
}
