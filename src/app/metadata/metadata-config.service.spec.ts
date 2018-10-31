import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';

import { MetadataConfigService } from './metadata-config.service';

describe('Metadata config service:', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MetadataConfigService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ],
            imports: [
                HttpModule
            ]
        });
    });

    class Utils {
        public static mockBackend(mockBase: any, mockDomain: any, mockEnumCrutch: any, mockBackend: MockBackend) {
            mockBackend.connections.subscribe((connection: any) => {
                const url = connection.request.url;
                let response;
                if (url === '/assets/gen-json/base.json') {
                    response = mockBase;
                } else if (url === '/assets/gen-json/domain.json') {
                    response = mockDomain;
                } else if (url === '/assets/enumCrutch.json') {
                    response = mockEnumCrutch;
                }
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(response)
                })));
            });
        }
    }

    describe('load', () => {
        it('should load config', async(inject([MetadataConfigService, MockBackend], (service: MetadataConfigService, mockBackend: MockBackend) => {
            const mockBase: any = {
                enums: [],
                structs: [
                    {
                        name: 'Content',
                        fields: []
                    }
                ]
            };

            const mockDomain: any = {
                enums: [
                    {
                        name: 'CategoryType',
                        members: []
                    }
                ],
                structs: [
                    {
                        name: 'ContractInfo',
                        fields: []
                    }
                ]
            };
            
            const mockEnumCrutch: any = [
                {
                    struct: 'Terminal',
                    field: 'risk_coverage',
                    enumName: 'RiskScore'
                }
            ];

            Utils.mockBackend(mockBase, mockDomain, mockEnumCrutch, mockBackend);

            const expected: any = {
                enums: [
                    {
                        name: 'CategoryType',
                        members: []
                    }
                ],
                structs: [
                    {
                        name: 'Content',
                        fields: [],
                        namespace: 'base'
                    },
                    {
                        name: 'ContractInfo',
                        fields: [],
                        namespace: 'domain'
                    }
                ],
                enumCrutch: [
                    {
                        struct: 'Terminal',
                        field: 'risk_coverage',
                        enumName: 'RiskScore'
                    }
                ]
            };

            service.load().then((result: any) => {
                expect(expected).toEqual(result);
            });
        })));
    });

    describe('getMetadataConfig', () => {
        it('should get metadata config', async(inject([MetadataConfigService, MockBackend], (service: MetadataConfigService, mockBackend: MockBackend) => {
            const mockBase: any = {
                enums: [],
                structs: [
                    {
                        name: 'Content',
                        fields: []
                    }
                ]
            };

            const mockDomain: any = {
                enums: [
                    {
                        name: 'CategoryType',
                        members: []
                    }
                ],
                structs: [
                    {
                        name: 'ContractInfo',
                        fields: []
                    }
                ]
            };

            const mockEnumCrutch: any = [
                {
                    struct: 'Terminal',
                    field: 'risk_coverage',
                    enumName: 'RiskScore'
                }
            ];

            Utils.mockBackend(mockBase, mockDomain, mockEnumCrutch, mockBackend);

            const expected: any = {
                enums: [
                    {
                        name: 'CategoryType',
                        members: []
                    }
                ],
                structs: [
                    {
                        name: 'Content',
                        fields: [],
                        namespace: 'base'
                    },
                    {
                        name: 'ContractInfo',
                        fields: [],
                        namespace: 'domain'
                    }
                ],
                enumCrutch: [
                    {
                        struct: 'Terminal',
                        field: 'risk_coverage',
                        enumName: 'RiskScore'
                    }
                ]
            };

            service.load().then(() => {
                const result = service.getMetadataConfig();
                expect(expected).toEqual(result);
            });
        })));
    });
});
