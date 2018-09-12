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
        this.form.addControl('position', this.fb.control('', Validators.required));
        this.form.addControl('fullName', this.fb.control('', Validators.required));
        this.form.addControl('document', this.fb.group({}));
    }
}
