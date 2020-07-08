import { ProviderObject } from '../damsel/gen-model/domain';

export const filterProvidersByTerminalSelector = (
    objects: ProviderObject[],
    filterValue: 'decisions' | 'value'
): ProviderObject[] => {
    return objects.filter((object) => {
        const selector = object.data.terminal;
        switch (filterValue) {
            case 'decisions':
                return selector?.decisions;
            case 'value':
                return selector?.value;
        }
    });
};
