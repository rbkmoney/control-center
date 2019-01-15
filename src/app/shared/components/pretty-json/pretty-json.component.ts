import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-pretty-json',
    templateUrl: './pretty-json.component.html',
    styles: [
        `
            :host /deep/ * {
                font-family: Menlo, Monaco, 'Courier New', monospace;
                font-weight: normal;
                font-size: 12px;
                line-height: 18px;
                letter-spacing: 0px;
            }
            :host /deep/ .string {
                color: #0451a5;
            }

            :host /deep/ .number {
                color: #09885a;
            }

            :host /deep/ .boolean {
                color: #0451a5;
            }

            :host /deep/ .null {
                color: #0451a5;
            }

            :host /deep/ .key {
                color: #a31515;
            }

            pre {
                white-space: pre-wrap;
            }
        `
    ]
})
export class PrettyJsonComponent {
    @Input()
    object: object;

    @Input()
    inline = false;
}
