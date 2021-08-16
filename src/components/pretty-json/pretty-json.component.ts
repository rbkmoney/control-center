import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-pretty-json',
    templateUrl: './pretty-json.component.html',
    styles: [
        `
            :host ::ng-deep * {
                font-family: Menlo, Monaco, 'Courier New', monospace;
                font-weight: normal;
                font-size: 12px;
                line-height: 18px;
                letter-spacing: 0px;
            }

            :host ::ng-deep .string {
                color: #0451a5;
            }

            :host ::ng-deep .number {
                color: #09885a;
            }

            :host ::ng-deep .boolean {
                color: #0451a5;
            }

            :host ::ng-deep .null {
                color: #0451a5;
            }

            :host ::ng-deep .key {
                color: #a31515;
            }

            pre {
                white-space: pre-wrap;
            }
        `,
    ],
})
export class PrettyJsonComponent {
    @Input()
    object: any;

    @Input()
    inline = false;

    @Input()
    cleanLook: boolean;
}
