import { Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { Int64 } from 'thrift-ts/lib';
import uuid from 'uuid/v4';

export const testClaim = (): Claim => ({
    id: new Int64(3310),
    party_id: uuid(),
    status: { pending: {} },
    changeset: [
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:37:15.048230Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: {
                        id: 'b986a4ac-8efc-4efe-a70b-c0c6bc11cd44',
                        modification: {
                            creation: {},
                        },
                    },
                    file_modification: null,
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '4893b9d7-1962-4c49-be28-2bab64065904',
                email: 'kein.i.m@yandex.ru',
                username: 'kein.i.m@yandex.ru',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:41:56.936188Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: 'b7b54cae-0860-4434-a379-7eedc3a71c2f',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '4893b9d7-1962-4c49-be28-2bab64065904',
                email: 'kein.i.m@yandex.ru',
                username: 'kein.i.m@yandex.ru',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:42:03.073749Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: null,
                    comment_modification: null,
                    status_modification: {
                        status: {
                            pending: null,
                            review: {},
                            pending_acceptance: null,
                            accepted: null,
                            denied: null,
                            revoked: null,
                        },
                        modification: {
                            change: {},
                        },
                    },
                },
            },
            user_info: {
                id: '4893b9d7-1962-4c49-be28-2bab64065904',
                email: 'kein.i.m@yandex.ru',
                username: 'kein.i.m@yandex.ru',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:46:08.832545Z',
            modification: {
                party_modification: {
                    contractor_modification: {
                        id: '00f9f55d-4bcd-4235-bec1-9d99b0921faa',
                        modification: {
                            creation: {
                                registered_user: null,
                                legal_entity: {
                                    russian_legal_entity: {
                                        registered_name: 'ЗАО "Китайский медицинский центр"',
                                        registered_number: '',
                                        inn: '6664030684',
                                        actual_address:
                                            'обл Свердловская, г Екатеринбург, ул Дагестанская, дом 10',
                                        post_address:
                                            'обл Свердловская, г Екатеринбург, ул Дагестанская, дом 10',
                                        representative_position: 'Генеральный директор',
                                        representative_full_name: 'Гвоздевич Владимир Дмитриевич',
                                        representative_document: '2323 223232',
                                        russian_bank_account: {
                                            account: '30101810450040000719',
                                            bank_name: 'ФИЛИАЛ № 5440 БАНКА ВТБ (ПАО)',
                                            bank_post_account: '30101810450040000719',
                                            bank_bik: '045004719',
                                        },
                                    },
                                    international_legal_entity: null,
                                },
                                private_entity: null,
                            },
                            identification_level_modification: null,
                        },
                    },
                    contract_modification: null,
                    shop_modification: null,
                },
                claim_modification: null,
            },
            user_info: {
                id: 'a188758a-1308-4fbd-b95e-66ad85a37822',
                email: 'i.galeev@rbkmoney.com',
                username: 'i.galeev',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:46:08.864078Z',
            modification: {
                party_modification: {
                    contractor_modification: null,
                    contract_modification: {
                        id: '227f8087-7b15-4e3e-992b-ecb006d5a291',
                        modification: {
                            creation: {
                                contractor_id: '00f9f55d-4bcd-4235-bec1-9d99b0921faa',
                                template: null,
                                payment_institution: {
                                    id: 1,
                                },
                            },
                            termination: null,
                            adjustment_modification: null,
                            payout_tool_modification: null,
                            legal_agreement_binding: null,
                            report_preferences_modification: null,
                            contractor_modification: null,
                        },
                    },
                    shop_modification: null,
                },
                claim_modification: null,
            },
            user_info: {
                id: 'a188758a-1308-4fbd-b95e-66ad85a37822',
                email: 'i.galeev@rbkmoney.com',
                username: 'i.galeev',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:46:08.920884Z',
            modification: {
                party_modification: {
                    contractor_modification: null,
                    contract_modification: {
                        id: '227f8087-7b15-4e3e-992b-ecb006d5a291',
                        modification: {
                            creation: null,
                            termination: null,
                            adjustment_modification: null,
                            payout_tool_modification: {
                                payout_tool_id: 'd67a5399-6e6d-4a81-89ff-6a4e64ca139c',
                                modification: {
                                    creation: {
                                        currency: {
                                            symbolic_code: 'RUB',
                                        },
                                        tool_info: {
                                            russian_bank_account: {
                                                account: '30101810450040000719',
                                                bank_name: 'ФИЛИАЛ № 5440 БАНКА ВТБ (ПАО)',
                                                bank_post_account: '30101810450040000719',
                                                bank_bik: '045004719',
                                            },
                                            international_bank_account: null,
                                            wallet_info: null,
                                        },
                                    },
                                    info_modification: null,
                                },
                            },
                            legal_agreement_binding: null,
                            report_preferences_modification: null,
                            contractor_modification: null,
                        },
                    },
                    shop_modification: null,
                },
                claim_modification: null,
            },
            user_info: {
                id: 'a188758a-1308-4fbd-b95e-66ad85a37822',
                email: 'i.galeev@rbkmoney.com',
                username: 'i.galeev',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:46:08.975634Z',
            modification: {
                party_modification: {
                    contractor_modification: null,
                    contract_modification: null,
                    shop_modification: {
                        id: '5f9a3a1a-23a3-49c8-b3e8-73e268712cc0',
                        modification: {
                            creation: {
                                category: {
                                    id: 1,
                                },
                                location: {
                                    url: 'https://about.gitlab.com',
                                },
                                details: {
                                    name: 'gitlab',
                                    description: null,
                                },
                                contract_id: '227f8087-7b15-4e3e-992b-ecb006d5a291',
                                payout_tool_id: 'd67a5399-6e6d-4a81-89ff-6a4e64ca139c',
                            },
                            category_modification: null,
                            details_modification: null,
                            contract_modification: null,
                            payout_tool_modification: null,
                            location_modification: null,
                            shop_account_creation: null,
                            payout_schedule_modification: null,
                            cash_register_modification_unit: null,
                        },
                    },
                },
                claim_modification: null,
            },
            user_info: {
                id: 'a188758a-1308-4fbd-b95e-66ad85a37822',
                email: 'i.galeev@rbkmoney.com',
                username: 'i.galeev',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:46:09.016198Z',
            modification: {
                party_modification: {
                    contractor_modification: null,
                    contract_modification: null,
                    shop_modification: {
                        id: '5f9a3a1a-23a3-49c8-b3e8-73e268712cc0',
                        modification: {
                            creation: null,
                            category_modification: null,
                            details_modification: null,
                            contract_modification: null,
                            payout_tool_modification: null,
                            location_modification: null,
                            shop_account_creation: {
                                currency: {
                                    symbolic_code: 'RUB',
                                },
                            },
                            payout_schedule_modification: null,
                            cash_register_modification_unit: null,
                        },
                    },
                },
                claim_modification: null,
            },
            user_info: {
                id: 'a188758a-1308-4fbd-b95e-66ad85a37822',
                email: 'i.galeev@rbkmoney.com',
                username: 'i.galeev',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:46:19.089463Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: null,
                    comment_modification: null,
                    status_modification: {
                        status: {
                            pending: null,
                            review: null,
                            pending_acceptance: {},
                            accepted: null,
                            denied: null,
                            revoked: null,
                        },
                        modification: {
                            change: {},
                        },
                    },
                },
            },
            user_info: {
                id: 'a188758a-1308-4fbd-b95e-66ad85a37822',
                email: 'i.galeev@rbkmoney.com',
                username: 'i.galeev',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:46:19.725743Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: null,
                    comment_modification: null,
                    status_modification: {
                        status: {
                            pending: null,
                            review: null,
                            pending_acceptance: null,
                            accepted: {},
                            denied: null,
                            revoked: null,
                        },
                        modification: {
                            change: {},
                        },
                    },
                },
            },
            user_info: {
                id: 'a188758a-1308-4fbd-b95e-66ad85a37822',
                email: 'i.galeev@rbkmoney.com',
                username: 'i.galeev',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:30:35.280757Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: {
                        id: 'dfd5cd6c-d181-488c-bd65-07aa9b04c624',
                        modification: {
                            creation: {},
                        },
                    },
                    file_modification: null,
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '7eb065b9-787a-41bd-a29b-e93c9e8fbb19',
                email: 'a.usacheva@rbkmoney.com',
                username: 'a.usacheva',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:30:35.302014Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: '94e58a50-3fae-4e5b-a85a-f986c4f1fda9',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '7eb065b9-787a-41bd-a29b-e93c9e8fbb19',
                email: 'a.usacheva@rbkmoney.com',
                username: 'a.usacheva',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:30:59.830309Z',
            modification: {
                party_modification: {
                    contractor_modification: {
                        id: '830d7eac-1d4b-4764-bffe-9ec5ca0762e6',
                        modification: {
                            creation: {
                                registered_user: null,
                                legal_entity: {
                                    russian_legal_entity: {
                                        registered_name: 'ООО "А+В"',
                                        registered_number: '',
                                        inn: '5403029107',
                                        actual_address:
                                            'обл Новосибирская, г Новосибирск, ул Королева, этаж 3, дом 17А, оф 311',
                                        post_address:
                                            'обл Новосибирская, г Новосибирск, ул Королева, этаж 3, дом 17А, оф 311',
                                        representative_position: 'Директор',
                                        representative_full_name: 'Гришин Денис Борисович',
                                        representative_document: '1111 111111',
                                        russian_bank_account: {
                                            account: '30101810900000000607',
                                            bank_name: 'БАЙКАЛЬСКИЙ БАНК ПАО СБЕРБАНК',
                                            bank_post_account: '30101810900000000607',
                                            bank_bik: '042520607',
                                        },
                                    },
                                    international_legal_entity: null,
                                },
                                private_entity: null,
                            },
                            identification_level_modification: null,
                        },
                    },
                    contract_modification: null,
                    shop_modification: null,
                },
                claim_modification: null,
            },
            user_info: {
                id: '7eb065b9-787a-41bd-a29b-e93c9e8fbb19',
                email: 'a.usacheva@rbkmoney.com',
                username: 'a.usacheva',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:30:59.876256Z',
            modification: {
                party_modification: {
                    contractor_modification: null,
                    contract_modification: {
                        id: '6d6de5ea-424a-46a8-b124-a99fec9f7c23',
                        modification: {
                            creation: {
                                contractor_id: '830d7eac-1d4b-4764-bffe-9ec5ca0762e6',
                                template: null,
                                payment_institution: {
                                    id: 1,
                                },
                            },
                            termination: null,
                            adjustment_modification: null,
                            payout_tool_modification: null,
                            legal_agreement_binding: null,
                            report_preferences_modification: null,
                            contractor_modification: null,
                        },
                    },
                    shop_modification: null,
                },
                claim_modification: null,
            },
            user_info: {
                id: '7eb065b9-787a-41bd-a29b-e93c9e8fbb19',
                email: 'a.usacheva@rbkmoney.com',
                username: 'a.usacheva',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:30:59.923302Z',
            modification: {
                party_modification: {
                    contractor_modification: null,
                    contract_modification: {
                        id: '6d6de5ea-424a-46a8-b124-a99fec9f7c23',
                        modification: {
                            creation: null,
                            termination: null,
                            adjustment_modification: null,
                            payout_tool_modification: {
                                payout_tool_id: '0f12e4cb-403f-4916-92ea-e67d6e7f5939',
                                modification: {
                                    creation: {
                                        currency: {
                                            symbolic_code: 'RUB',
                                        },
                                        tool_info: {
                                            russian_bank_account: {
                                                account: '30101810900000000607',
                                                bank_name: 'БАЙКАЛЬСКИЙ БАНК ПАО СБЕРБАНК',
                                                bank_post_account: '30101810900000000607',
                                                bank_bik: '042520607',
                                            },
                                            international_bank_account: null,
                                            wallet_info: null,
                                        },
                                    },
                                    info_modification: null,
                                },
                            },
                            legal_agreement_binding: null,
                            report_preferences_modification: null,
                            contractor_modification: null,
                        },
                    },
                    shop_modification: null,
                },
                claim_modification: null,
            },
            user_info: {
                id: '7eb065b9-787a-41bd-a29b-e93c9e8fbb19',
                email: 'a.usacheva@rbkmoney.com',
                username: 'a.usacheva',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:30:59.997079Z',
            modification: {
                party_modification: {
                    contractor_modification: null,
                    contract_modification: null,
                    shop_modification: {
                        id: '9361a604-bff0-45c6-bf97-20640bbdb3aa',
                        modification: {
                            creation: {
                                category: {
                                    id: 1,
                                },
                                location: {
                                    url: 'https://docs.google.com/',
                                },
                                details: {
                                    name: 'docs',
                                    description: null,
                                },
                                contract_id: '6d6de5ea-424a-46a8-b124-a99fec9f7c23',
                                payout_tool_id: '0f12e4cb-403f-4916-92ea-e67d6e7f5939',
                            },
                            category_modification: null,
                            details_modification: null,
                            contract_modification: null,
                            payout_tool_modification: null,
                            location_modification: null,
                            shop_account_creation: null,
                            payout_schedule_modification: null,
                            cash_register_modification_unit: null,
                        },
                    },
                },
                claim_modification: null,
            },
            user_info: {
                id: '7eb065b9-787a-41bd-a29b-e93c9e8fbb19',
                email: 'a.usacheva@rbkmoney.com',
                username: 'a.usacheva',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:31:00.030100Z',
            modification: {
                party_modification: {
                    contractor_modification: null,
                    contract_modification: null,
                    shop_modification: {
                        id: '9361a604-bff0-45c6-bf97-20640bbdb3aa',
                        modification: {
                            creation: null,
                            category_modification: null,
                            details_modification: null,
                            contract_modification: null,
                            payout_tool_modification: null,
                            location_modification: null,
                            shop_account_creation: {
                                currency: {
                                    symbolic_code: 'RUB',
                                },
                            },
                            payout_schedule_modification: null,
                            cash_register_modification_unit: null,
                        },
                    },
                },
                claim_modification: null,
            },
            user_info: {
                id: '7eb065b9-787a-41bd-a29b-e93c9e8fbb19',
                email: 'a.usacheva@rbkmoney.com',
                username: 'a.usacheva',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:31:04.834028Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: null,
                    comment_modification: null,
                    status_modification: {
                        status: {
                            pending: null,
                            review: null,
                            pending_acceptance: {},
                            accepted: null,
                            denied: null,
                            revoked: null,
                        },
                        modification: {
                            change: {},
                        },
                    },
                },
            },
            user_info: {
                id: '7eb065b9-787a-41bd-a29b-e93c9e8fbb19',
                email: 'a.usacheva@rbkmoney.com',
                username: 'a.usacheva',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-01T11:31:05.355741Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: null,
                    comment_modification: null,
                    status_modification: {
                        status: {
                            pending: null,
                            review: null,
                            pending_acceptance: null,
                            accepted: {},
                            denied: null,
                            revoked: null,
                        },
                        modification: {
                            change: {},
                        },
                    },
                },
            },
            user_info: {
                id: '7eb065b9-787a-41bd-a29b-e93c9e8fbb19',
                email: 'a.usacheva@rbkmoney.com',
                username: 'a.usacheva',
                type: {
                    internal_user: {},
                    external_user: null,
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:16:26.271133Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: {
                        id: '67858e02-2d98-402d-b23c-130d2a6ceb08',
                        modification: {
                            creation: {},
                        },
                    },
                    file_modification: null,
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:27:22.983864Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: '25bef833-3fbd-441b-94b0-6c67a42ede0f',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:28:03.361918Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: '845e2920-6e59-4ded-bd4e-54c2f20a818a',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:28:07.515431Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: '94775e1d-88bd-417b-ad99-c42c4e2d543c',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:28:07.521611Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: 'b66aedd7-f10b-474e-8a92-76cadc6a0646',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:28:10.362755Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: 'ee8f3aba-e930-4f23-b1c9-36fe27818b22',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:28:10.369714Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: '941f4adb-f955-496a-bc97-16dbf6857d3c',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:28:10.374962Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: 'bf7a3916-0e5a-4878-8dd1-22afd85bba10',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:36:43.522805Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: '49e5e578-a742-46ac-b4b5-13cdc481294c',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:36:43.531474Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: {
                        id: '448ce2ae-3c29-4895-b8d8-73436924bfff',
                        modification: {
                            creation: {},
                        },
                    },
                    comment_modification: null,
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:36:51.376097Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: null,
                    comment_modification: null,
                    status_modification: {
                        status: {
                            pending: null,
                            review: {},
                            pending_acceptance: null,
                            accepted: null,
                            denied: null,
                            revoked: null,
                        },
                        modification: {
                            change: {},
                        },
                    },
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
        {
            modification_id: new Int64(123),
            created_at: '2020-06-21T21:37:43.106787Z',
            modification: {
                party_modification: null,
                claim_modification: {
                    document_modification: null,
                    file_modification: null,
                    comment_modification: {
                        id: '5e77bf32-a5cb-445b-a4a1-e387cbd51fb5',
                        modification: {
                            creation: {},
                        },
                    },
                    status_modification: null,
                },
            },
            user_info: {
                id: '5bed7154-7a9c-4605-9be6-ad6e5532cb1b',
                email: 'superman@msk.im',
                username: 'superman@msk.im',
                type: {
                    internal_user: null,
                    external_user: {},
                },
            },
        },
    ],
    revision: 3,
    created_at: '',
    updated_at: '',
});
