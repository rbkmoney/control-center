import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class TerminalDecisionsService {

    public shopForm: FormGroup;
    public targetsForm: FormGroup;
    public decisionForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.shopForm = this.prepareShopForm();
        this.targetsForm = this.prepareTargetsForm();
        this.decisionForm = this.prepareDecisionForm();
    }

    private prepareShopForm(): FormGroup {
        return this.fb.group({
            shopId: ['', Validators.required],
        });
    }

    private prepareTargetsForm(): FormGroup {
        return this.fb.group({
            source: ['', Validators.required],
            destination: ['', Validators.required]
        });
    }

    private prepareDecisionForm(): FormGroup {
        return this.fb.group({
            decision: ['', Validators.required]
        });
    }

    private generateDynamicForm(inputs: any): FormGroup {
        return this.fb.group(inputs);
    }
}
