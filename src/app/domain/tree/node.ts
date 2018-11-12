import { FormControl } from '@angular/forms';

export type Types = 'select' | 'toggle' | 'field';
export type Structure = 'list-item' | 'map-key' | 'map-value';

export interface Node {
    label: string;
    type?: Types;
    structure?: Structure;
    control?: FormControl;
    children?: Node[];
    select?:  {
        options: string[];
        selected?: string;
        selectionChange({value}): any;
    };
}
