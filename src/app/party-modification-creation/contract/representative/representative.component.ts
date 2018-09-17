import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-representative',
    templateUrl: 'representative.component.html'
})
export class RepresentativeComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('position', this.fb.control('', Validators.required));
        this.form.registerControl('fullName', this.fb.control('', Validators.required));
        this.form.registerControl('document', this.fb.group({}));
    }
}
