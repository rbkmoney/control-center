import { TerminalOption } from '../../../domain-typed-manager';

export const getRietTemplateOptions = (): TerminalOption[] =>
    ([
        {
            key: 'custom_return_url',
            value: ''
        },
        {
            key: 'routing',
            value: ''
        },
        {
            key: 'routing_recurrent',
            value: ''
        },
        {
            key: 'terminal_id',
            value: ''
        }
    ]);
