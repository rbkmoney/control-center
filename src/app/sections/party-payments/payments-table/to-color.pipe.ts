import { Pipe, PipeTransform } from '@angular/core';

import { StatusColor } from '../../../shared/components/status/status-color';

@Pipe({
    name: 'toColor',
})
export class ToColorPipe implements PipeTransform {
    transform(status: string): StatusColor {
        return getStatusColor(status);
    }
}

const getStatusColor = (status: string): StatusColor => {
    switch (status) {
        case 'processed':
        case 'captured':
            return StatusColor.success;
        case 'pending':
        case 'charged_back':
            return StatusColor.pending;
        case 'failed':
        case 'cancelled':
            return StatusColor.warn;
        case 'refunded':
            return StatusColor.neutral;
    }
}
