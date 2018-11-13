import { FormControl } from '@angular/forms';

import { Type2 } from '../../metadata/metadata.service';

export type Types = 'select' | 'toggle' | 'field';
export type Structure = 'list-item' | 'map-key' | 'map-value';

export class Node {
    obj: Type2;
    label: string;
    isExpanded: boolean;
    type?: Types;
    structure?: Structure;
    control?: FormControl;
    children?: Node[];
    select?: {
        options: string[];
        selected?: string;
        selectionChange({value}): any;
    };

    set(obj: Partial<Node>) {
        for (const name of Object.keys(obj)) {
            this[name] = obj[name];
        }
    }

    serialize() {

    }
}
