import { Component, Input } from '@angular/core';

@Component({
    selector: 'cc-thrift-json',
    templateUrl: 'thrift-json.component.html',
    styles: [`
        :host /deep/ .string {
            color: #008000;
            font-weight: bold;
        }

        :host /deep/ .number {
            color: #0000FF;
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
            color: #660E7A;
            font-weight: bold;
        }
    `]
})
export class ThriftJsonComponent {

    @Input()
    object: object;
}
