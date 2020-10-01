import get from 'lodash-es/get';
import isEmpty from 'lodash-es/isEmpty';

import { getUnionKey, toOptional } from '@cc/utils/index';

import {
    MonthOperationCount,
    MonthOperationSum,
    PropertyInfoDocumentType,
    WithoutChiefAccountant,
} from '../../thrift-services/ank/gen-model/questionary';
import { Questionary } from '../../thrift-services/ank/gen-model/questionary_manager';
import {
    createEnding,
    createHeader,
    createHeadline,
    createInlineCheckbox,
    createInlineCheckboxWithTitle,
    createVerticalCheckboxWithTitle,
    createVerticalParagraph,
} from '../create-content';
import { DocDef } from '../create-questionary';
import { getBusinessInfo, getShopLocationURL, simpleYesNo, toYesNo, YesNo } from '../select-data';
import { getIndividualEntityName } from './get-individual-entity-name';

const EMPTY = '';

export function getDocDef(questionary: Questionary): DocDef {
    const { data } = toOptional(questionary);
    const { contractor, shop_info, contact_info } = toOptional(data);
    const { location, details } = toOptional(shop_info);
    const { name: brandName } = toOptional(details);
    const { phone_number, email } = toOptional(contact_info);
    const {
        additional_info,
        russian_private_entity,
        registration_info,
        inn,
        snils,
        property_info_document_type,
        individual_person_categories,
        beneficial_owners,
        residency_info,
    } = toOptional(get(contractor, ['individual_entity', 'russian_individual_entity']));
    const {
        NKO_relation_target,
        relationship_with_NKO,
        month_operation_sum,
        month_operation_count,
        benefit_third_parties,
        relation_individual_entity,
    } = toOptional(additional_info);
    const { fio } = toOptional(russian_private_entity);
    const registration_place = get(registration_info, [
        'individual_registration_info',
        'registration_place',
    ]);
    const documentType = getUnionKey(property_info_document_type);
    const { foreign_public_person, foreign_relative_person } = toOptional(
        individual_person_categories
    );
    const usa_tax_resident = get(residency_info, ['individual_residency_info', 'usa_tax_resident']);

    const name = getIndividualEntityName(fio);
    const url = getShopLocationURL(location);
    const { hasChiefAccountant, staffCount, accountingOrgInn, accounting } = getBusinessInfo(
        additional_info
    );
    const pdlRelationDegree = EMPTY; // TODO
    const hasBeneficialOwner = !isEmpty(beneficial_owners);

    return {
        content: [
            createHeader('Приложение №'),
            createHeadline(
                'ОПРОСНЫЙ ЛИСТ – ИНДИВИДУАЛЬНОГО ПРЕДПРИНИМАТЕЛЯ ИЛИ ФИЗИЧЕСКОГО ЛИЦА, ЗАНИМАЮЩЕГОСЯ В УСТАНОВЛЕННОМ ЗАКОНОДАТЕЛЬСТВОМ РФ ПОРЯДКЕ ЧАСТНОЙ ПРАКТИКОЙ'
            ),
            createVerticalParagraph('1. Основные сведения о Клиенте', [
                [`1.1. Наименование: ${name || EMPTY}`, `1.2. ИНН: ${inn || EMPTY}`],
                [
                    `1.3. Фирменное наименование: ${brandName || EMPTY}`,
                    `1.4. СНИЛС №: ${snils || EMPTY}`,
                ],
            ]),
            createVerticalParagraph('2. Контактная информация', [
                [
                    `2.1. Телефон: ${phone_number || EMPTY}`,
                    `2.2. Сайт (Url): ${url || EMPTY}`,
                    `2.3. Email: ${email || EMPTY}`,
                ],
            ]),
            createVerticalParagraph(
                '3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО',
                [
                    [
                        `3.1. Цели установления отношений: ${
                            NKO_relation_target || 'подключение интернет-эквайринга'
                        }`,
                        `3.2. Характер отношений: ${relationship_with_NKO || 'долгосрочный'}`,
                    ],
                ]
            ),
            createVerticalParagraph('4. Планируемые операции по счету, в месяц', [
                [
                    createVerticalCheckboxWithTitle(
                        '4.1. Количество операций:',
                        [
                            [MonthOperationCount.lt_ten, 'до 10'],
                            [MonthOperationCount.btw_ten_to_fifty, '10 - 50'],
                            [MonthOperationCount.gt_fifty, 'свыше 50'],
                        ],
                        month_operation_count
                    ),
                    createVerticalCheckboxWithTitle(
                        '4.2. Сумма операций:',
                        [
                            [MonthOperationSum.lt_five_hundred_thousand, 'до 500 000'],
                            [
                                MonthOperationSum.btw_five_hundred_thousand_to_one_million,
                                '500 000 - 1 000 000',
                            ],
                            [MonthOperationSum.gt_one_million, 'свыше 1 000 000'],
                        ],
                        month_operation_sum
                    ),
                ],
            ]),
            createVerticalParagraph(
                '5. Адрес фактического осуществления (ведения) деятельности',
                registration_place || EMPTY
            ),
            createVerticalParagraph(
                '6. Тип документа, подтверждающий право нахождения по фактическому адресу',
                [
                    [
                        createInlineCheckbox<keyof PropertyInfoDocumentType>(
                            [
                                ['lease_contract', 'Договор аренды'],
                                ['sublease_contract', 'Договор субаренды'],
                                ['certificate_of_ownership', 'Свидетельство о праве собственности'],
                            ],
                            documentType
                        ),
                    ],
                ]
            ),
            createVerticalParagraph('7. Сведения о хозяйственной деятельности', [
                [
                    createInlineCheckboxWithTitle(
                        '7.1. Наличие в штате главного бухгалтера',
                        simpleYesNo,
                        hasChiefAccountant
                    ),
                    `7.2. Штатная численность в организации: ${staffCount || EMPTY}`,
                ],
                [
                    {
                        ...createVerticalCheckboxWithTitle<keyof WithoutChiefAccountant>(
                            '7.3. Бухгалтерский учет осуществляет:',
                            [
                                ['head_accounting', 'ИП лично'],
                                [
                                    'accounting_organization',
                                    `Организация ведущая бух. учет: ИНН: ${
                                        accountingOrgInn || EMPTY
                                    }`,
                                ],
                                ['individual_accountant', 'Бухгалтер – индивидуальный специалист'],
                            ],
                            accounting
                        ),
                        colSpan: 2,
                    },
                ],
            ]),
            createVerticalParagraph(
                '8. Принадлежность физического лица к некоторым категория граждан',
                [
                    [
                        {
                            ...createInlineCheckboxWithTitle(
                                '8.1. Принадлежность к категории ПДЛ¹',
                                simpleYesNo,
                                toYesNo(foreign_public_person)
                            ),
                            colSpan: 2,
                        },
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '8.2. Является родственником ПДЛ',
                            simpleYesNo,
                            toYesNo(foreign_relative_person)
                        ),
                        `8.3. Степень родства: ${pdlRelationDegree || EMPTY}`,
                    ],
                ]
            ),
            createVerticalParagraph('9. Наличие выгодоприобретателя²', [
                [
                    createInlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [
                                YesNo.yes,
                                'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)',
                            ],
                        ],
                        toYesNo(benefit_third_parties)
                    ),
                ],
            ]),
            createVerticalParagraph('10. Наличие бенефициарного владельца³', [
                [
                    createInlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [
                                YesNo.yes,
                                'Да (обязательное заполнение приложение для Бенефициарного владельца по форме НКО)',
                            ],
                        ],
                        toYesNo(hasBeneficialOwner)
                    ),
                ],
            ]),
            createVerticalParagraph(
                '11. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве',
                [[createInlineCheckbox(simpleYesNo, toYesNo(!!relation_individual_entity))]]
            ),
            createVerticalParagraph(
                '12. Являетесь ли Вы налоговым резидентом США или иного иностранного государства',
                [[createInlineCheckbox(simpleYesNo, toYesNo(usa_tax_resident))]]
            ),
        ],
        prefooter: createEnding(),
        footer: [
            '¹ Публичные должностные лица, включая российские, иностранные и международные.',
            '² Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.',
            '³ Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.',
        ].join('\n'),
        footerHeight: 3.6,
    };
}
