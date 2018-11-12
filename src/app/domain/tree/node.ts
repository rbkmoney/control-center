import { FormControl } from '@angular/forms';

export type Types = 'list-item' | 'map-key' | 'map-value' | 'select' | 'bool';

export interface Node {
    label: string;
    type?: Types;
    control?: FormControl;
    children?: Node[];
    select?:  {
        options: string[];
        selected?: string;
        selectionChange({value}): any;
    };
}
