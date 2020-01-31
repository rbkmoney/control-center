import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from '../core/config.service';
import { Category } from './model';

@Injectable()
export class CategoryService {
    private readonly papiEndpoint: string;

    constructor(private http: HttpClient, configService: ConfigService) {
        this.papiEndpoint = configService.config.papiEndpoint;
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.papiEndpoint}/dmt/categories`);
    }
}
