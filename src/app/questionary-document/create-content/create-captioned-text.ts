import { Layout } from '../create-questionary';
import { Content } from '../../document';

export function createCaptionedText(text: string, caption: string): Content {
    return {
        layout: Layout.underline,
        table: {
            body: [
                [
                    {
                        text,
                        style: {
                            bold: true,
                            alignment: 'center'
                        }
                    }
                ],
                [
                    {
                        text: caption,
                        style: {
                            bold: true,
                            alignment: 'center',
                            italics: true
                        }
                    }
                ]
            ]
        }
    };
}
