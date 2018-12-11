import { FormControl } from '@angular/forms';

import { Field, MetadataService, Structure, Type } from '../../../metadata/metadata.service';
import { stringify } from '../../../shared/stringify';

export interface Params<T extends Structure = Type> {
    metadata?: T;
    field?: Field;
    initValue?: any;
    parent?: Node;
}

export enum NODE_CONTROL_TYPE {
    INPUT = 'input',
    SELECT = 'select',
    TOGGLE = 'toggle'
}

export class NodeControl extends FormControl {
    type: NODE_CONTROL_TYPE;
    options?: { name: string, value: string | number | boolean }[];
}

export abstract class Node<T extends Structure = Type> {
    field?: Field;
    parent?: Node;
    children?: Node[];
    add?: (value?: any) => any;
    control?: NodeControl;
    initValue?: any;

    protected constructor({metadata, field, initValue, parent}: Params<T> = {}) {
        this.metadata = metadata;
        this.field = field;
        this.initValue = initValue;
        this.parent = parent || null;
        this.isNull = this.isNullable && (initValue === null || initValue === undefined);
    }

    private _isNull: boolean;

    get isNull() {
        return this._isNull;
    }

    set isNull(isNull: boolean) {
        if (this.isNullable) {
            this._isNull = isNull;
            if (this.control && this.control.value !== null) {
                this.control.setValue(null);
            }
        }
    }

    private _metadata?: T;

    get metadata(): T {
        return this._metadata || this.parent.metadata as T;
    }

    set metadata(metadata: T) {
        this._metadata = metadata;
    }

    get isNullable() {
        return this.field && this.field.option === 'optional';
    }

    get isFake() {
        return !this._metadata;
    }

    get label() {
        return this.field ? `${this.fieldLabel} (${this.typeLabel})` : this.typeLabel;
    }

    get fieldLabel() {
        return this.field ? `${this.field.name}${this.field.option === 'required' ? '*' : ''}` : '';
    }

    get typeLabel() {
        return `${this.metadata.structure} ${this.metadata.name}`;
    }

    get isRef() {
        return this.metadata.name.slice(-3) === 'Ref';
    }

    get hasChildren() {
        return Boolean(Array.isArray(this.children) && this.children.length);
    }

    get icon() {
        return this.parent ? this.parent.getChildIcon(this as Node) : undefined;
    }

    abstract get value(): any;

    get isChanged(): boolean {
        if (this.isFake) {
            for (const child of this.children) {
                if (child.isChanged) {
                    return true;
                }
            }
            return false;
        }
        return !MetadataService.isEqualValue(this.extractData(), this.initValue);
    }

    get errorsCount(): number {
        let count = 0;
        if (!this.isNull) {
            if (this.control) {
                count += Number(this.control.invalid);
            }
            if (!count && Array.isArray(this.children)) {
                for (const child of this.children) {
                    count += child.errorsCount;
                }
            }
        }
        return count;
    }

    get valid(): boolean {
        return !this.errorsCount;
    }

    get isRemovable() {
        return Boolean(this.parent && this.parent.add);
    }

    initControl(type: NODE_CONTROL_TYPE) {
        this.control = new NodeControl();
        this.control.type = type;
        this.control.valueChanges.subscribe((value) => {
            if (value === null) {
                this.isNull = true;
            }
        });
    }

    getChildIcon(node?: Node): { name: string; color?: string } {
        return undefined;
    }

    findNode(refNode: Node): Node {
        if (this.parent && Array.isArray(this.parent.children) && this.parent.children.length >= 2 && this.eq(refNode)) {
            return this.parent;
        }
        let resultNode;
        if (this.children) {
            for (const child of this.children) {
                if (resultNode = child.findNode(refNode)) {
                    return resultNode;
                }
            }
        }
        return undefined;
    }

    eq(node: Node): boolean {
        return this.metadata === node.metadata && stringify(this.initValue) === stringify(node.initValue);
    }

    toString(value = this.value, level = 0) {
        if (value === null) {
            return 'null';
        }
        if (typeof value === 'object') {
            if (value instanceof Map) {
                if (level > 0) {
                    return '[...]';
                }
                return '[' + Array.from(value).map(([k, v]) => '[' + this.toString(k, level + 1) + ', ' + this.toString(v, level + 1) + ']').join(', ') + ']';
            } else if (Array.isArray(value)) {
                if (level > 0) {
                    return '[...]';
                }
                return '[' + value.map((v) => this.toString(v, level + 1)).join(', ') + ']';
            } else {
                if (level > 0) {
                    return '{...}';
                }
                return '{' + Object.keys(value).map((key) => {
                    return key + ': ' + this.toString(value[key], level + 1);
                }).join(', ') + '}';
            }
        }
        return String(value);
    }

    extractData() {
        return this.metadata.toThrift(this.value);
    }

    remove() {
        if (this.parent) {
            const idx = this.parent.children.findIndex((c) => c === this);
            return this.parent.children.splice(idx, 1);
        }
    }
}

