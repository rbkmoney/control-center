import { Content } from '../../document';

export function createHeader(text: string): Content {
    return {
        text,
        style: { alignment: 'right' }
    };
}
