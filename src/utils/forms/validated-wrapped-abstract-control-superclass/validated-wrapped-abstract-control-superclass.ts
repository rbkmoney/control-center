import { Directive, Injector, OnInit } from '@angular/core';
import { ValidationErrors, Validator } from '@angular/forms';

import { RequiredSuper, REQUIRED_SUPER } from '../../required-super';
import { getValue } from '../get-value';
import { WrappedAbstractControlSuperclass } from './wrapped-abstract-control-superclass';

@Directive()
export abstract class ValidatedWrappedAbstractControlSuperclass<OuterType, InnerType = OuterType>
    extends WrappedAbstractControlSuperclass<OuterType, InnerType>
    implements OnInit, Validator {
    protected emptyValue: InnerType;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): RequiredSuper {
        this.emptyValue = getValue(this.formControl) as InnerType;
        super.ngOnInit();
        return REQUIRED_SUPER;
    }

    validate(): ValidationErrors | null {
        return this.formControl.invalid ? { invalid: true } : null;
    }

    protected outerToInner(outer: OuterType): InnerType {
        if (typeof this.emptyValue === 'object') {
            if (!outer) return this.emptyValue;
            return { ...this.emptyValue, ...outer };
        }
        return (outer as unknown) as InnerType;
    }
}
