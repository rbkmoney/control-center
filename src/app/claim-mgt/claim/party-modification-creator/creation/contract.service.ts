import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../../core/config.service';
import { ContractTemplate } from '../../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class ContractService {
    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getContractTemplates(): Observable<ContractTemplate[]> {
        return this.http.get<ContractTemplate[]>(`${this.papiEndpoint}/dmt/contract/templates`);
    }
}
