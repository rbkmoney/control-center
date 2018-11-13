import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { MetadataService } from '../../metadata/metadata.service';

@Injectable()
export class TreeService {
    constructor(private metadataService: MetadataService, private fb: FormBuilder) {
    }
}
