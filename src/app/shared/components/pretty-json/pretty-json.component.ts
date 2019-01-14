import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-pretty-json',
    templateUrl: './pretty-json.component.html',
    styles: [
        `
            :host /deep/ .string {
                color: #008000;
                font-weight: bold;
            }

            :host /deep/ .number {
                color: #0000ff;
                font-weight: bold;
            }

            :host /deep/ .boolean {
                color: #000080;
                font-weight: bold;
            }

            :host /deep/ .null {
                color: magenta;
                font-weight: bold;
            }

            :host /deep/ .key {
                color: #660e7a;
                font-weight: bold;
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
