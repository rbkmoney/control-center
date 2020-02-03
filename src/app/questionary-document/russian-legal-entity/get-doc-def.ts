import isEmpty from 'lodash-es/isEmpty';

import {
    createInlineCheckboxWithTitle,
    createVerticalParagraph,
    createHeader,
    createHeadline,
    createEnding
} from '../create-content';
import { createInlineCheckbox, createVerticalCheckboxWithTitle } from '../create-content';
import {
    YesNo,
    getShopLocationURL,
    getContactInfo,
    getBusinessInfo,
    toYesNo,
    simpleYesNo
} from '../select-data';
import { DocDef } from '../create-questionary';
import { getAuthorityConfirmingDocument } from './get-authority-confirming-document';
import { Questionary } from '../../thrift-services/ank/gen-model/questionary_manager';
import { toOptional } from '../../shared/utils';
import { getUnionKey } from '../../shared/get-union-key';
import {
    MonthOperationCount,
    MonthOperationSum,
    PropertyInfoDocumentType,
    WithoutChiefAccountant
} from '../../thrift-services/ank/gen-model/questionary';

const EMPTY = '';

export function getDocDef(questionary: Questionary): DocDef {
    const { data } = toOptional(questionary);
    const { contractor, shop_info: shopInfo, contact_info: contactInfo } = toOptional(data);
    const { location, details } = toOptional(shopInfo);
    const { name } = toOptional(details);
    const { phone_number, email } = toOptional(contactInfo);
    const {
        legal_entity: { russian_legal_entity }
    } = toOptional(contractor);
    const {
        additional_info,
        inn,
        name: brandName,
        legal_owner_info,
        beneficial_owners,
        property_info_document_type,
        registration_info: { legal_registration_info },
        residency_info: { legal_residency_info }
    } = toOptional(russian_legal_entity);
    const { registration_place } = toOptional(legal_registration_info);
    const { tax_resident, fatca, owner_resident } = toOptional(legal_residency_info);
    const {
        relation_individual_entity,
        benefit_third_parties,
        NKO_relation_target,
        relationship_with_NKO,
        month_operation_sum,
        month_operation_count
    } = toOptional(additional_info);
    const {
        pdl_relation_degree,
        pdl_category,
        snils,
        authority_confirming_document,
        russian_private_entity
    } = toOptional(legal_owner_info);
    const { fio, contact_info } = toOptional(russian_private_entity);
    const documentType = getUnionKey(property_info_document_type);

    const url = getShopLocationURL(location);
    const contact = getContactInfo(contact_info);
    const authorityConfirmingDocumentInfo = getAuthorityConfirmingDocument(
        authority_confirming_document
    );
    const { hasChiefAccountant, staffCount, accounting, accountingOrgInn } = getBusinessInfo(
        additional_info
    );
    const hasBeneficialOwner = !isEmpty(beneficial_owners);

    return {
        content: [
            createHeader('Приложение №'),
            createHeadline(
                'ОПРОСНЫЙ ЛИСТ – ЮРИДИЧЕСКОГО ЛИЦА (НЕ ЯВЛЯЮЩЕГОСЯ КРЕДИТНОЙ ОРГАНИЗАЦИЕЙ)'
            ),
            createVerticalParagraph('1. Основные сведения о Клиенте', [
                [`1.1. Наименование: ${name || EMPTY}`, `1.2. ИНН: ${inn || EMPTY}`],
                [{ text: `1.3. Фирменное наименование: ${brandName || EMPTY}`, colSpan: 2 }]
            ]),
            createVerticalParagraph('2. Контактная информация', [
                [
                    `2.1. Телефон: ${phone_number || EMPTY}`,
                    `2.2. Сайт (Url): ${url || EMPTY}`,
                    `2.3. Email: ${email || EMPTY}`
                ]
            ]),
            createVerticalParagraph(
                '3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО',
                [
                    [
                        `3.1. Цели установления отношений: ${NKO_relation_target ||
                            'подключение интернет-эквайринга'}`,
                        `3.2. Характер отношений: ${relationship_with_NKO || 'долгосрочный'}`
                    ]
                ]
            ),
            createVerticalParagraph('4. Планируемые операции, в месяц', [
                [
                    createVerticalCheckboxWithTitle(
                        '4.1. Количество операций:',
                        [
                            [MonthOperationCount.lt_ten, 'до 10'],
                            [MonthOperationCount.btw_ten_to_fifty, '10 - 50'],
                            [MonthOperationCount.gt_fifty, 'свыше 50']
                        ],
                        month_operation_count
                    ),
                    createVerticalCheckboxWithTitle(
                        '4.2. Сумма операций:',
                        [
                            [MonthOperationSum.lt_five_hundred_thousand, 'до 500 000'],
                            [
                                MonthOperationSum.btw_five_hundred_thousand_to_one_million,
                                '500 000 - 1 000 000'
                            ],
                            [MonthOperationSum.gt_one_million, 'свыше 1 000 000']
                        ],
                        month_operation_sum
                    )
                ]
            ]),
            createVerticalParagraph(
                '5. Сведения о единоличном исполнительном органе юридического лица',
                [
                    [
                        {
                            text: `5.1. ФИО Единоличного исполнительного органа: ${fio || EMPTY}`,
                            colSpan: 2
                        }
                    ],
                    [
                        {
                            text: `5.2. Действует на основании: ${authorityConfirmingDocumentInfo ||
                                EMPTY}`,
                            colSpan: 2
                        }
                    ],
                    [
                        `5.3. СНИЛС №: ${snils || EMPTY}`,
                        `5.4. Контактная информация (телефон, email): ${contact || EMPTY}`
                    ]
                ]
            ),
            createVerticalParagraph(
                '6. Данные о фактическом местонахождении органа управления (Руководителя)',
                registration_place || EMPTY
            ),
            createVerticalParagraph(
                '7. Тип документа, подтверждающий право нахождения по фактическому адресу органа управления (Руководителя)',
                [
                    [
                        createInlineCheckbox<keyof PropertyInfoDocumentType>(
                            [
                                ['lease_contract', 'Договор аренды'],
                                ['sublease_contract', 'Договор субаренды'],
                                ['certificate_of_ownership', 'Свидетельство о праве собственности']
                            ],
                            documentType
                        )
                    ]
                ]
            ),
            createVerticalParagraph('8. Сведения о хозяйственной деятельности организации', [
                [
                    createInlineCheckboxWithTitle(
                        '8.1. Наличие в штате главного бухгалтера',
                        simpleYesNo,
                        hasChiefAccountant
                    ),
                    `8.2. Штатная численность в организации: ${staffCount || EMPTY}`
                ],
                [
                    createVerticalCheckboxWithTitle<keyof WithoutChiefAccountant>(
                        '8.3. Бухгалтерский учет осуществляет:',
                        [
                            ['head_accounting', 'Руководитель организации'],
                            [
                                'accounting_organization',
                                `Организация ведущая бух. учет: ИНН: ${accountingOrgInn || EMPTY}`
                            ],
                            ['individual_accountant', 'Бухгалтер – индивидуальный специалист']
                        ],
                        accounting
                    )
                ]
            ]),
            createVerticalParagraph(
                '9. Принадлежность Единоличного исполнительного органа к некоторым категориям граждан',
                [
                    [
                        createInlineCheckboxWithTitle(
                            '9.1. Принадлежность к категории ПДЛ¹',
                            simpleYesNo,
                            toYesNo(pdl_category)
                        )
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '9.2. Является родственником ПДЛ',
                            simpleYesNo,
                            toYesNo(!!pdl_relation_degree)
                        ),
                        `9.3. Степень родства: ${pdl_relation_degree || EMPTY}`
                    ]
                ]
            ),
            createVerticalParagraph('10. Наличие выгодоприобретателя²', [
                [
                    [
                        createInlineCheckbox(
                            [
                                [YesNo.no, 'Нет'],
                                [
                                    YesNo.yes,
                                    'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)'
                                ]
                            ],
                            toYesNo(benefit_third_parties)
                        )
                    ]
                ]
            ]),
            createVerticalParagraph('11. Наличие бенефициарного владельца³', [
                [
                    createInlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [
                                YesNo.yes,
                                'Да (обязательное заполнение приложение для Бенефициарного владельца)'
                            ]
                        ],
                        toYesNo(hasBeneficialOwner)
                    )
                ]
            ]),
            createVerticalParagraph(
                '12. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве, в отношении Вашей компании',
                [[createInlineCheckbox(simpleYesNo, toYesNo(!!relation_individual_entity))]]
            ),
            createVerticalParagraph('13. Информация об иностранном налоговом резидентстве', [
                [
                    {
                        text:
                            '13.1. Является ли Ваша организация налоговым резидентом США или иного иностранного государства?',
                        colSpan: 5
                    },
                    createInlineCheckbox(simpleYesNo, toYesNo(tax_resident))
                ],
                [
                    {
                        text:
                            '13.2. Является ли Бенефициарный владелец Вашей организации с долей владения 10% и более налоговым резидентом иностранного государства?',
                        colSpan: 5
                    },
                    createInlineCheckbox(simpleYesNo, toYesNo(owner_resident))
                ],
                [
                    {
                        text:
                            '13.3. Является ли Ваша организация Финансовым Институтом в соответствии с FATCA и 173-ФЗ от 28.06.2014?',
                        colSpan: 5
                    },
                    createInlineCheckbox(simpleYesNo, toYesNo(fatca))
                ]
            ])
        ],
        prefooter: createEnding(),
        footer: [
            '¹ Публичные должностные лица, включая российские, иностранные и международные.',
            '² Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.',
            '³ Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.'
        ].join('\n'),
        footerHeight: 3.2
    };
}
