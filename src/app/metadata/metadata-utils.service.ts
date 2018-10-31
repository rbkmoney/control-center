import { TypeName } from './model/type-name.enum';
import { Required } from './model/required.enum';

export class MetadataUtils {

    public static isPrimitive(typeId: number): boolean {
        return typeId === TypeName.i8
            || typeId === TypeName.i16
            || typeId === TypeName.i32
            || typeId === TypeName.i64
            || typeId === TypeName.string;
    }

    public static isStruct(typeId: number): boolean {
        return typeId === TypeName.struct;
    }

    public static isUnion(typeId: number): boolean {
        return typeId === TypeName.union;
    }

    public static isIterable(typeId: number): boolean {
        return typeId === TypeName.list
            || typeId === TypeName.set;
    }

    public static isMap(typeId: number): boolean {
        return typeId === TypeName.map;
    }

    public static isEnum(typeId: number): boolean {
        return typeId === TypeName.enum;
    }

    public static isBool(typeId: number): boolean {
        return typeId === TypeName.bool;
    }

    public static getPrimitiveDisplayName(typeId: number): string {
        let result = 'string';
        if (typeId === TypeName.i16) {
            result = 'i16';
        } else if (typeId === TypeName.i32) {
            result = 'i32';
        } else if (typeId === TypeName.i64) {
            result = 'i64';
        }
        return result;
    }

    public static getRequiredSymbol(required: Required) {
        return required === Required.required ? '*' : null;
    }
}
