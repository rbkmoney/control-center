import { Component } from '@angular/core';

import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';

@Component({
    selector: 'cc-questionary-timeline-item',
    templateUrl: 'questionary-timeline-item.component.html',
})
export class QuestionaryTimelineItemComponent {
    questionary: Questionary = {
        id: '954a0aaf-3d4a-4afc-a193-c04e269646a3',
        owner_id: 'izipppo@gmail.com',
        party_id: '52774cd9-b36c-4bbc-8755-35cd1fbe4918',
        data: {
            contractor: {
                individual_entity: null,
                legal_entity: {
                    russian_legal_entity: {
                        name: 'АО "КРЕДИТ ЕВРОПА БАНК (РОССИЯ)"',
                        foreign_name: null,
                        legal_form: null,
                        inn: '7705148464',
                        registration_info: {
                            individual_registration_info: null,
                            legal_registration_info: {
                                ogrn: null,
                                registration_date: '1997-05-22T20:00:00Z',
                                registration_place: null,
                                registration_address: 'г Москва, пр-кт Олимпийский, дом 14',
                                actual_address: null,
                            },
                        },
                        additional_space: null,
                        okato_code: '45286570000',
                        okpo_code: '46360991',
                        postal_address: null,
                        founders_info: null,
                        license_info: null,
                        principal_activity: null,
                        legal_owner_info: {
                            russian_private_entity: {
                                fio: 'Айдыноглу Бехчет Халук',
                                birth_date: null,
                                birth_place: null,
                                citizenship: null,
                                residence_address: null,
                                actual_address: null,
                                contact_info: null,
                            },
                            inn: '770507385841',
                            identity_document: null,
                            migration_card_info: null,
                            residence_approve: null,
                            pdl_category: false,
                            authority_confirming_document: null,
                            snils: null,
                            pdl_relation_degree: null,
                            term_of_office: null,
                            head_position:
                                'Единоличный Исполнительный Орган (Президент, Председатель Правления )',
                        },
                        beneficial_owners: null,
                        additional_info: null,
                        residency_info: {
                            individual_residency_info: null,
                            legal_residency_info: {
                                tax_resident: false,
                                owner_resident: false,
                                fatca: false,
                            },
                        },
                        property_info_document_type: null,
                        has_beneficial_owners: false,
                    },
                },
            },
            bank_account: null,
            shop_info: {
                location: {
                    url: 'www.crediteurope.ru',
                },
                details: {
                    name: 'Кредит',
                    description: null,
                },
            },
            contact_info: {
                phone_number: '+7 968 423 35 39',
                email: 'izipppo@gmail.com',
            },
        },
    };
}
