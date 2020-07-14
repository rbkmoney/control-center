import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cc-file',
    templateUrl: 'file.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileComponent {}
