import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ConfigService } from '../core/config.service';
import { Category } from './model';

@Injectable()
export class CategoryService {
    categories$ = this.http.get<Category[]>(
        `${this.configService.config.papiEndpoint}/dmt/categories`
    );

    constructor(private http: HttpClient, private configService: ConfigService) {}
}
