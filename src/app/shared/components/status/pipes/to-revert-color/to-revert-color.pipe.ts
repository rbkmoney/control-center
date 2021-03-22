import { Pipe, PipeTransform } from '@angular/core';

import { StatusColor } from '../../types/status-color';

@Pipe({
    name: 'toRevertColor',
})
export class ToRevertColorPipe implements PipeTransform {
    transform(status: string): StatusColor {
        return getStatusColor(status);
    }
}

const getStatusColor = (status: string): StatusColor => {
    const s = status.toLowerCase();
    switch (s) {
        case 'succeeded':
            return StatusColor.success;
        case 'pending':
            return StatusColor.pending;
        case 'failed':
            return StatusColor.warn;
        default:
            return StatusColor.neutral;
    }
};
