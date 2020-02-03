import { Content } from '../../document';

export interface DocDef {
    content: (Content | string)[];
    prefooter?: Content;
    footer?: string;
    footerHeight?: number;
}
