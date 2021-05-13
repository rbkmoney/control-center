import { animate, state, style, transition, trigger } from '@angular/animations';

export const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';

// based on https://github.com/angular/components/blob/master/src/material/expansion/expansion-animations.ts

export const INDICATOR_ROTATE = trigger('indicatorRotate', [
    state('collapsed, void', style({ transform: 'rotate(90deg)' })),
    state('expanded', style({ transform: 'rotate(180deg)' })),
    transition(
        'expanded <=> collapsed, void => collapsed',
        animate(EXPANSION_PANEL_ANIMATION_TIMING)
    ),
]);

export const BODY_EXPANSION = trigger('bodyExpansion', [
    state('void', style({ height: '0px', padding: '0', opacity: 0.5 })),
    state('*', style({ height: '*', padding: '*', opacity: 1 })),
    transition('* <=> *', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
]);
