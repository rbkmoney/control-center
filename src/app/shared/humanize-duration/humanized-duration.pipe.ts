import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { HumanizerOptions } from 'humanize-duration';
import { interval, Subscription } from 'rxjs';

import { HumanizeConfig, HumanizeDurationService, Value } from './humanize-duration.service';

export interface HumanizeDurationConfig extends HumanizeConfig {
    interval?: number;
}

@Pipe({ name: 'humanizedDuration', pure: false })
export class HumanizedDurationPipe implements OnDestroy, PipeTransform {
    private latestValue: string;
    private subscription: Subscription;
    private inputValue: Value;

    constructor(
        private humanizeDurationService: HumanizeDurationService,
        private ref: ChangeDetectorRef
    ) {}

    transform(value: Value, { interval: inpIntervalMs, ...config }: HumanizeDurationConfig = {}) {
        if (value !== this.inputValue) {
            this.inputValue = value;
            this.latestValue = this.humanizeDurationService.getDuration(value, config);
            this.dispose();
            if (!this.humanizeDurationService.isDiff(value)) {
                this.subscription = interval(
                    inpIntervalMs ||
                        this.humanizeDurationService.getOptimalUpdateInterval(value, config)
                ).subscribe(() => this.updateValue(value, config));
            }
        }
        return this.latestValue;
    }

    ngOnDestroy(): void {
        this.dispose();
    }

    private dispose(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    private updateValue(value: Value, config: HumanizerOptions): void {
        const duration = this.humanizeDurationService.getDuration(value, config);
        if (duration !== this.latestValue) {
            this.ref.markForCheck();
            this.latestValue = duration;
        }
    }
}
