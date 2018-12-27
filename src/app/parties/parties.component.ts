import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PartiesService } from './parties.service';

@Component({
    templateUrl: 'parties.component.html',
    styleUrls: ['../shared/container.css'],
    providers: [PartiesService]
})
export class PartiesComponent implements OnInit {

    public form: FormGroup;

    constructor(private partiesService: PartiesService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.form = this.partiesService.form;
    }

    goToParty() {
        const { partyId } = this.form.value;
        this.router.navigate(['party', partyId.trim()])
    }
}
