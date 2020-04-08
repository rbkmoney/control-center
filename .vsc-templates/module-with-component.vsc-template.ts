import * as vsc from 'vsc-base';

const PREFIX = 'cc';

function getModuletName(name: string) {
    return `${vsc.toPascalCase(name)}Module`;
}

function getModulePath(name: string) {
    return `${vsc.toKebabCase(name)}.module`;
}

function getComponentName(name: string) {
    return `${vsc.toPascalCase(name)}Component`;
}

function getComponentPath(name: string) {
    return `${vsc.toKebabCase(name)}.component`;
}

function getCssClassName(name: string) {
    return `${PREFIX}-${vsc.toKebabCase(name)}`;
}

export function Template(path: string, templatePath: string): vsc.vscTemplate {
    return {
        userInputs: [
            {
                title: 'Component name',
                argumentName: 'name',
                defaultValue: '',
            },
        ],
        template: [
            {
                type: 'folder',
                name: (inputs) => vsc.toKebabCase(inputs.name),
                children: [
                    {
                        type: 'file',
                        name: (inputs) => `${getModulePath(inputs.name)}.ts`,
                        content: (inputs) => `
import { NgModule } from '@angular/core';

import { ${getComponentName(inputs.name)} } from './${getComponentPath(inputs.name)}';

@NgModule({
    imports: [],
    declarations: [${getComponentName(inputs.name)}],
    exports: [${getComponentName(inputs.name)}]
})
export class ${getModuletName(inputs.name)} {}
`,
                    },
                    {
                        type: 'file',
                        name: (inputs) => `${getComponentPath(inputs.name)}.html`,
                        content: (inputs) => `
<div class="${PREFIX}-${vsc.toKebabCase(inputs.name)}">
    <ng-content></ng-content>
</div>
`,
                    },
                    {
                        type: 'file',
                        name: (inputs) => `${getComponentPath(inputs.name)}.scss`,
                        content: (inputs) => `
.${getCssClassName(inputs.name)} {
}
`,
                    },
                    {
                        type: 'file',
                        name: (inputs) => `${getComponentPath(inputs.name)}.ts`,
                        content: (inputs) => `
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: '${PREFIX}-${vsc.toKebabCase(inputs.name)}',
    templateUrl: '${getComponentPath(inputs.name)}.html',
    styleUrls: ['${getComponentPath(inputs.name)}.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ${getComponentName(inputs.name)} {
}
`,
                    },
                    {
                        type: 'file',
                        name: (inputs) => `index.ts`,
                        content: (inputs) => `
export * from './${getModulePath(inputs.name)}';
export * from './${getComponentPath(inputs.name)}'
`,
                    },
                    {
                        type: 'file',
                        name: (inputs) => `_${vsc.toKebabCase(inputs.name)}-theme.scss`,
                        content: (inputs) => `
@import '~@angular/material/theming';

@mixin ${getCssClassName(inputs.name)}-theme($theme) {
    .${getCssClassName(inputs.name)} {
    }
}

@mixin ${getCssClassName(inputs.name)}-typography($config) {
    .${getCssClassName(inputs.name)} {
    }
}
`,
                    },
                ],
            },
        ],
    };
}
