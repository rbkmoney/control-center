import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { bodyExpansion, indicatorRotate } from './collapse-animation';

type CollapseAnimationState = 'collapsed' | 'expanded';
type AnimationState = { value: CollapseAnimationState };

@Component({
    selector: 'cc-collapse',
    templateUrl: 'collapse.component.html',
    styleUrls: ['collapse.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [bodyExpansion, indicatorRotate],
})
export class CollapseComponent {
    @Input() title: string;
    @Input() expanded = false;

    get animationState(): AnimationState {
        return {
            value: this.expanded ? 'expanded' : 'collapsed',
        };
    }

    toggle() {
        this.expanded = !this.expanded;
    }
}
