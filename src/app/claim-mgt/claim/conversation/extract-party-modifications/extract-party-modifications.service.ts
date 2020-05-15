import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { TypeContainer } from './to-type-container';

@Injectable()
export class ExtractPartyModificationsService {
    constructor(private fb: FormBuilder) {}

    init(types: TypeContainer[]) {
        return this.fb.array(types.map(() => false));
    }
}
