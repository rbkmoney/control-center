import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { RussianPrivateEntity } from '../../../../../thrift-services/ank/gen-model/questionary';

@Component({
    selector: 'cc-russian-private-entity-info',
    template: `
        <div fxLayout="column" fxLayoutGap="10px">
            <div fxLayout fxLayoutGap="10px">
                <cc-details-item title="FIO" fxFlex>{{
                    russianPrivateEntity?.fio | emptyDefault
                }}</cc-details-item>
                <cc-details-item title="Birth date" fxFlex>{{
                    russianPrivateEntity?.birth_date | date | emptyDefault
                }}</cc-details-item>
            </div>
            <cc-details-item title="Birth place">{{
                russianPrivateEntity?.birth_place | emptyDefault
            }}</cc-details-item>
            <cc-details-item title="Residence address">{{
                russianPrivateEntity?.residence_address | emptyDefault
            }}</cc-details-item>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RussianPrivateEntityInfoComponent {
    @Input() russianPrivateEntity: RussianPrivateEntity;
}
