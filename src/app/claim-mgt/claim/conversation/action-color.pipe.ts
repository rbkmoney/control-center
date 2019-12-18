import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info/model';
import { StatusColor } from '../../../shared/color';

@Pipe({
    name: 'actionColor'
})
export class ActionColorPipe implements PipeTransform {
    transform(action: TimelineAction): StatusColor | null {
        switch (action) {
            case TimelineAction.statusAccepted:
                return StatusColor.success;
            case TimelineAction.statusDenied:
            case TimelineAction.statusRevoked:
                return StatusColor.warn;
            default:
                return null;
        }
    }
}
