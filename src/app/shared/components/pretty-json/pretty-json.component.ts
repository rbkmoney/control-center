import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

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
        `,
    ],
})
export class PrettyJsonComponent implements OnChanges {
    @Input()
    object: object;

    @Input()
    inline = false;

    @Input()
    cleanLook: boolean;

    ngOnChanges(changes: SimpleChanges): void {
        const { cleanLook, object } = changes;
        if (object?.currentValue && cleanLook?.currentValue) {
            this.object = this.clean(object.currentValue);
        }
    }

    private clean(obj) {
        const propNames = Object.getOwnPropertyNames(obj);
        for (const propName of propNames) {
            if (obj[propName] === null) {
                delete obj[propName];
            } else if (typeof obj[propName] === 'object') {
                obj[propName] = this.clean(obj[propName]);
            }
        }
        return obj;
    }
}
