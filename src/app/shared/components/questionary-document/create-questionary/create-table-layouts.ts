import { TableLayoutFunctions } from 'pdfmake/build/pdfmake';

import { PRIMARY_COLOR } from './colors';

export enum Layout {
    noBorders = 'noBorders',
    noPaddings = 'noPaddings',
    header = 'header',
    wrapper = 'wrapper',
    underline = 'underline',
}

const NO_PADDINGS: TableLayoutFunctions = {
    paddingLeft: () => 0,
    paddingRight: () => 0,
    paddingTop: () => 0,
    paddingBottom: () => 0,
};

const NO_BORDERS: TableLayoutFunctions = {
    hLineWidth: () => 0,
    vLineWidth: () => 0,
};

export function createTableLayouts(): { [name in Layout]: TableLayoutFunctions } {
    return {
        [Layout.noBorders]: NO_BORDERS,
        [Layout.noPaddings]: NO_PADDINGS,
        [Layout.wrapper]: {
            ...NO_BORDERS,
            ...NO_PADDINGS,
        },
        [Layout.header]: {
            fillColor(rowIdx) {
                return rowIdx === 0 ? PRIMARY_COLOR : null;
            },
            ...NO_BORDERS,
        },
        [Layout.underline]: {
            hLineWidth: (idx) => (idx === 1 ? 0.5 : 0),
            vLineWidth: () => 0,
            paddingLeft: () => 0,
            paddingRight: () => 0,
            paddingTop: () => 0,
        },
    };
}
