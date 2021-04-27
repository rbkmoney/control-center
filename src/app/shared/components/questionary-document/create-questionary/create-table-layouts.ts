import { TableLayoutFunctions } from 'pdfmake/build/pdfmake';

import { PRIMARY_COLOR } from './colors';

export enum Layout {
    NoBorders = 'noBorders',
    NoPaddings = 'noPaddings',
    Header = 'header',
    Wrapper = 'wrapper',
    Underline = 'underline',
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
        [Layout.NoBorders]: NO_BORDERS,
        [Layout.NoPaddings]: NO_PADDINGS,
        [Layout.Wrapper]: {
            ...NO_BORDERS,
            ...NO_PADDINGS,
        },
        [Layout.Header]: {
            fillColor(rowIdx) {
                return rowIdx === 0 ? PRIMARY_COLOR : null;
            },
            ...NO_BORDERS,
        },
        [Layout.Underline]: {
            hLineWidth: (idx) => (idx === 1 ? 0.5 : 0),
            vLineWidth: () => 0,
            paddingLeft: () => 0,
            paddingRight: () => 0,
            paddingTop: () => 0,
        },
    };
}
