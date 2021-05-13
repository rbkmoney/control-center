import { Injectable } from '@angular/core';
import * as humanizeDuration from 'humanize-duration';
import * as moment from 'moment';

export type Value = number | string | moment.Moment | Date;

export interface HumanizeConfig extends humanizeDuration.HumanizerOptions {
    isShort?: boolean;
    hasAgoEnding?: boolean;
}

@Injectable()
export class HumanizeDurationService {
    static hourMs = 3600000;
    static minHumanizeDurationUpdateMs = 1000;
    static momentHumanizeAllowedDelayBetweenUpdatesForMinuteUpdatesMs = 20000;
    static momentHumanizeAllowedDelayBetweenUpdatesForHourlyAndLongerUpdatesMs = 600000;
    static lessThanFewSeconds = 3000;

    private get duration() {
        return humanizeDuration.humanizer({
            language: 'en',
            round: true,
            delimiter: ' ',
        });
    }

    get shortEnglishHumanizer(): humanizeDuration.HumanizerOptions {
        return {
            language: 'short',
        };
    }

    getDiffMs(value: Value): number {
        return Math.abs(this.isDiff(value) ? value : moment().diff(moment(value)));
    }

    getDuration(value: Value, config: HumanizeConfig = {}): string {
        const diffMs = this.getDiffMs(value);
        let duration = this.duration(diffMs, config);
        if (isNaN(diffMs)) {
            return null;
        } else if (diffMs < HumanizeDurationService.lessThanFewSeconds) {
            return 'just now';
        } else if (config.isShort) {
            duration = this.duration(diffMs, { ...config, ...this.shortEnglishHumanizer });
        } else if (config.largest === 1) {
            duration = moment.duration(diffMs).humanize();
        }
        return config.hasAgoEnding ? `${duration} ago` : duration;
    }

    getOptimalUpdateInterval(value: Value, { largest }: HumanizeConfig): number {
        const diffMs = this.getDiffMs(value);
        if (diffMs < HumanizeDurationService.lessThanFewSeconds) {
            return HumanizeDurationService.minHumanizeDurationUpdateMs;
        }
        if (largest === 1) {
            if (diffMs < HumanizeDurationService.hourMs) {
                return HumanizeDurationService.momentHumanizeAllowedDelayBetweenUpdatesForMinuteUpdatesMs;
            }
            return HumanizeDurationService.momentHumanizeAllowedDelayBetweenUpdatesForHourlyAndLongerUpdatesMs;
        }
        return HumanizeDurationService.minHumanizeDurationUpdateMs;
    }

    isDiff(value: Value): value is number {
        return typeof value === 'number';
    }
}
