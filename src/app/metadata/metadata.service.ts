import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JsonAST } from 'thrift-ts/src/thrift-parser';

interface File {
    name: string;
    path: string;
    ast: JsonAST;
}

@Injectable()
export class MetadataService {

    public files: File[];

    constructor(private http: HttpClient) {
    }

    public async init(url: string): Promise<void> {
        this.files = await this.http.get<any>(url).toPromise();
    }

    public get<T extends keyof JsonAST>(type: string, parent: string): { structure: T, type: JsonAST[T][''] } {
        let [resultParent, resultType] = type.split('.');
        if (!resultType) {
            resultType = resultParent;
            resultParent = parent;
        }
        const file: File = this.files.find(({name}) => name === resultParent);
        for (const structureName of Object.keys(file.ast)) {
            const typeMetadata = file.ast[structureName][resultType];
            if (typeMetadata) {
                return {structure: structureName, type: typeMetadata} as any;
            }
        }
        return {structure: null, type: null};
    }
}
