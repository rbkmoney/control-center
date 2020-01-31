import { icons } from './icons';
import { Content } from '../../document';
import { Layout } from '../create-questionary';
import { createGrid } from './create-grid';

type Items<T extends any> = string[] | [T, string][];

function itemsIsKeyValue<T extends any>(srcItems: Items<T>): srcItems is [T, string][] {
    return Array.isArray(srcItems[0]);
}

function itemsToMap<T extends any>(srcItems: Items<T>): Map<T, string> {
    return itemsIsKeyValue(srcItems)
        ? new Map(srcItems)
        : new Map<T, string>(srcItems.map((i, idx) => [idx, i] as any));
}

function itemsWithActive<T extends any>(
    itemsSrc: Items<T>,
    activeKey?: T
): { key: T; value: string; isActive: boolean }[] {
    const items = itemsToMap(itemsSrc);
    return Array.from(items).map(([key, value]) => ({
        key,
        value,
        isActive: activeKey === key
    }));
}

export function createCheckbox(text: string, active = false): Content {
    return { text: [active ? icons.checkSquare : icons.square, ' ', text] };
}

export function createInlineCheckbox<T extends any>(itemsSrc: Items<T>, activeKey?: T): Content {
    const text = itemsWithActive(itemsSrc, activeKey)
        .reduce((acc, { value, isActive }) => [...acc, createCheckbox(value, isActive), '    '], [])
        .slice(0, -1);
    return { text };
}

export function createInlineCheckboxWithTitle<T extends any>(title: string, items: Items<T>, activeKey?: T): Content {
    const inlineCheckbox = createInlineCheckbox(items, activeKey);
    return { ...inlineCheckbox, text: [`${title}:    `, ...inlineCheckbox.text] };
}

export function createVerticalCheckbox<T extends any>(itemsSrc: Items<T>, activeKey?: T): Content {
    return {
        layout: Layout.noBorders,
        table: {
            widths: ['*'],
            body: itemsWithActive(itemsSrc, activeKey).map(({ value, isActive }) => [createCheckbox(value, isActive)])
        }
    };
}

export function createVerticalCheckboxWithTitle<T extends any>(title: string, items: Items<T>, activeKey?: T): Content {
    const verticalCheckbox = createVerticalCheckbox(items, activeKey);
    const { table } = verticalCheckbox;
    return {
        ...verticalCheckbox,
        table: {
            ...table,
            widths: ['auto', ...table.widths],
            body: table.body.map((row, idx) => [idx === 0 ? title : null, ...row])
        }
    };
}

export function createHorizontalCheckbox<T extends any>(itemsSrc: Items<T>, activeKey?: T): Content {
    return createGrid(
        itemsWithActive(itemsSrc, activeKey).map(({ value, isActive }) => createCheckbox(value, isActive)),
        0.25
    );
}
