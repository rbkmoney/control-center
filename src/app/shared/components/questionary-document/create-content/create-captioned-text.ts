import { Content } from '../../../../document';
import { Layout } from '../create-questionary';

export function createCaptionedText(text: string, caption: string): Content {
    return {
        layout: Layout.Underline,
        table: {
            body: [
                [
                    {
                        text,
                        style: {
                            bold: true,
                            alignment: 'center',
                        },
                    },
                ],
                [
                    {
                        text: caption,
                        style: {
                            bold: true,
                            alignment: 'center',
                            italics: true,
                        },
                    },
                ],
            ],
        },
    };
}
