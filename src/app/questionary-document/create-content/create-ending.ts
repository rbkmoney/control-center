import * as moment from 'moment';

import { cmMarginsToIn, Content } from '../../document';

export function createEnding(): Content {
    return {
        layout: 'noBorders',
        margin: cmMarginsToIn(0, 0.2, 0, 1.1),
        table: {
            widths: ['*', 'auto'],
            body: [
                [
                    'М.П.',
                    {
                        text: moment().format('LL') + '\n\n\n_____________________/______________/',
                        style: { alignment: 'right' }
                    }
                ]
            ]
        }
    };
}
