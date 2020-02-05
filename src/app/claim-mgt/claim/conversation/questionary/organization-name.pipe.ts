import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'organizationName'
})
export class OrganizationNamePipe implements PipeTransform {
    transform({ name, inn }: { name: string; inn: string }): string {
        return [name, inn && `(${inn})`].filter(i => i).join(' ');
    }
}
