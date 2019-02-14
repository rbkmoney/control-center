import { MetaType } from './model';

export abstract class AbstractMeta {
    readonly type: MetaType;
    readonly namespace: string;
    readonly name: string;
    readonly required: boolean;

    constructor(type: MetaType, namespace: string, name: string, required: boolean) {
        this.type = type;
        this.namespace = namespace;
        this.name = name;
        this.required = required;
    }
}
