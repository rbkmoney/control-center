import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Int64 from 'thrift-ts/lib/int64';

import { getUnionKey } from '../../../shared/utils';
import { Questionary } from '../../../thrift-services/ank/gen-model/questionary_manager';
import { Claim, Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { TimelineAction, TimelineItemInfo } from './to-timeline-info/model';

@Component({
    selector: 'cc-conversation',
    templateUrl: 'conversation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent {
    @Input()
    claim: Claim = {
        id: new Int64(123),
        party_id: '31123231231123123231321213',
        status: {
            review: {},
        },
        changeset: [],
        revision: 123,
        created_at: '2013-04-01T00:00:00.000',
    };

    questionary$ = new BehaviorSubject<Questionary>({
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
    });

    timelineInfos$ = new BehaviorSubject<TimelineItemInfo[]>([
        {
            action: TimelineAction.documentAdded,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [
                {
                    party_modification: null,
                    claim_modification: {
                        document_modification: {
                            id: '954a0aaf-3d4a-4afc-a193-c04e269646a3',
                            modification: {
                                creation: {},
                            },
                        },
                        file_modification: null,
                        comment_modification: null,
                        status_modification: null,
                    },
                },
            ],
        },
        {
            action: TimelineAction.partyModificationAdded,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.filesAdded,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [
                {
                    party_modification: null,
                    claim_modification: {
                        document_modification: null,
                        file_modification: {
                            id: 'b7b54cae-0860-4434-a379-7eedc3a71c2f',
                            modification: {
                                creation: {},
                                deletion: null,
                            },
                        },
                        comment_modification: null,
                        status_modification: null,
                    },
                },
            ],
        },
        {
            action: TimelineAction.filesDeleted,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [
                {
                    party_modification: null,
                    claim_modification: {
                        document_modification: null,
                        file_modification: {
                            id: 'b7b54cae-0860-4434-a379-7eedc3a71c2f',
                            modification: {
                                deletion: {},
                                creation: null,
                            },
                        },
                        comment_modification: null,
                        status_modification: null,
                    },
                },
            ],
        },
        {
            action: TimelineAction.commentAdded,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [
                {
                    party_modification: null,
                    claim_modification: {
                        document_modification: null,
                        file_modification: null,
                        comment_modification: {
                            id: '6814158a-10f4-431d-9037-73c0f3a5cc97',
                            modification: {
                                creation: {},
                                deletion: null,
                            },
                        },
                        status_modification: null,
                    },
                },
            ],
        },
        {
            action: TimelineAction.commentDeleted,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [
                {
                    party_modification: null,
                    claim_modification: {
                        document_modification: null,
                        file_modification: null,
                        comment_modification: {
                            id: '6814158a-10f4-431d-9037-73c0f3a5cc97',
                            modification: {
                                deletion: {},
                                creation: null,
                            },
                        },
                        status_modification: null,
                    },
                },
            ],
        },
        {
            action: TimelineAction.statusReview,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.statusPending,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.statusDenied,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [
                {
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
                                accepted: null,
                                denied: {
                                    reason: 'test claim',
                                },
                                revoked: null,
                            },
                            modification: {
                                change: {},
                            },
                        },
                    },
                },
            ],
        },
        {
            action: TimelineAction.statusRevoked,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [
                {
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
                                accepted: null,
                                denied: {
                                    reason: 'test claim',
                                },
                                revoked: null,
                            },
                            modification: {
                                change: {},
                            },
                        },
                    },
                },
            ],
        },
        {
            action: TimelineAction.statusAccepted,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
    ]);

    timelineAction = TimelineAction;

    getKey(modification: Modification) {
        return getUnionKey(modification);
    }
}
