import * as vsc from 'vsc-base';

const PREFIX = 'cc';

function getComponentName(name: string) {
    return `${vsc.toPascalCase(name)}Component`;
}

function getComponentPath(name: string) {
    return `${vsc.toKebabCase(name)}.component`;
}

function getClassName(name: string) {
    return `${PREFIX}-${vsc.toKebabCase(name)}`;
}

export function Template(path: string, templatePath: string): vsc.vscTemplate {
    return {
        userInputs: [
            {
                title: 'Component name',
                argumentName: 'name',
                defaultValue: ''
            }
        ],
        template: [
            {
                type: 'folder',
                name: inputs => vsc.toKebabCase(inputs.name),
                children: [
                    {
                        type: 'file',
                        name: inputs => `${getComponentPath(inputs.name)}.html`,
                        content: inputs => `
<div class="${PREFIX}-${vsc.toKebabCase(inputs.name)}">
    <ng-content></ng-content>
</div>
`
                    },
                    {
                        type: 'file',
                        name: inputs => `${getComponentPath(inputs.name)}.scss`,
                        content: inputs => `
.${PREFIX}-${vsc.toKebabCase(inputs.name)} {
}
`
                    },
                    {
                        type: 'file',
                        name: inputs => `${getComponentPath(inputs.name)}.ts`,
                        content: inputs => `
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: '${PREFIX}-${vsc.toKebabCase(inputs.name)}',
    templateUrl: '${getComponentPath(inputs.name)}.html',
    styleUrls: ['${getComponentPath(inputs.name)}.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${getComponentName(inputs.name)} {
}
`
                    },
                    {
                        type: 'file',
                        name: inputs => `index.ts`,
                        content: inputs => `
export * from './${getComponentPath(inputs.name)}'
`
                    }
                ]
            }
        ]
    };
}
