import {
    trigger,
    state,
    style,
    animate,
    transition,
    group,
    keyframes
} from '@angular/animations';


export const fadeOffAnimation =
    trigger('fadeOffAnimation', [
        transition('* => void', animate('1000ms ease-in', style({
            opacity: 0,
            transform: 'translateX(-155px)',
        }))),
        transition('void => *', animate('1000ms ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(15px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(7px)', offset: 0.5 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
        ]))),
    ]);

