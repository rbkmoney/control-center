import isEmpty from 'lodash-es/isEmpty';

import { DocDef } from '../create-questionary';
import {
    createVerticalCheckboxWithTitle,
    createInlineCheckboxWithTitle,
    createInlineCheckbox,
    createVerticalParagraph,
    createHeader,
    createHeadline,
    createEnding
} from '../create-content';
import { YesNo, getShopLocationURL, getBusinessInfo, toYesNo, simpleYesNo } from '../select-data';
import { getIndividualEntityName } from './get-individual-entity-name';
import { toOptional } from '../../shared/utils';
import { Questionary } from '../../thrift-services/ank/gen-model/questionary_manager';
import {
    MonthOperationCount,
    MonthOperationSum,
    PropertyInfoDocumentType,
    WithoutChiefAccountant
} from '../../thrift-services/ank/gen-model/questionary';
import { getUnionKey } from '../../shared/get-union-key';

const EMPTY = '';

export function getDocDef(questionary: Questionary): DocDef {
    const { data } = toOptional(questionary);
    const { contractor, shop_info: shopInfo, contact_info: contactInfo } = toOptional(data);
    const {
        individual_entity: { russian_individual_entity: individualEntity }
    } = toOptional(contractor);
    const { location, details } = toOptional(shopInfo);
    const { name: brandName } = toOptional(details);
    const { phone_number: phoneNumber, email } = toOptional(contactInfo);
    const {
        additional_info: additionalInfo,
        russian_private_entity: russianPrivateEntity,
        registration_info: { individual_registration_info: registrationInfo },
        inn,
        snils,
        property_info_document_type: propertyInfoDocumentType,
        individual_person_categories: individualPersonCategories,
        beneficial_owners: beneficialOwners,
        residency_info: { individual_residency_info: residencyInfo }
    } = toOptional(individualEntity);
    const {
        NKO_relation_target: nkoRelationTarget,
        relationship_with_NKO: relationshipWithNko,
        month_operation_sum: monthOperationSum,
        month_operation_count: monthOperationCount,
        benefit_third_parties: benefitThirdParties,
        relation_individual_entity: relationIndividualEntity
    } = toOptional(additionalInfo);
    const { fio } = toOptional(russianPrivateEntity);
    const { registration_place: registrationPlace } = toOptional(registrationInfo);
    const documentType = getUnionKey(propertyInfoDocumentType);
    const {
        foreign_public_person: foreignPublicPerson,
        foreign_relative_person: foreignRelativePerson
    } = toOptional(individualPersonCategories);
    const { usa_tax_resident: usaTaxResident } = toOptional(residencyInfo);

    const name = getIndividualEntityName(fio);
    const url = getShopLocationURL(location);
    const { hasChiefAccountant, staffCount, accountingOrgInn, accounting } = getBusinessInfo(
        additionalInfo
    );
    const pdlRelationDegree = EMPTY; // TODO
    const hasBeneficialOwner = !isEmpty(beneficialOwners);

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
                    `1.4. СНИЛС №: ${snils || EMPTY}`
                ]
            ]),
            createVerticalParagraph('2. Контактная информация', [
                [
                    `2.1. Телефон: ${phoneNumber || EMPTY}`,
                    `2.2. Сайт (Url): ${url || EMPTY}`,
                    `2.3. Email: ${email || EMPTY}`
                ]
            ]),
            createVerticalParagraph(
                '3. Сведения о целях установления и предполагаемом характере деловых отношений с НКО',
                [
                    [
                        `3.1. Цели установления отношений: ${nkoRelationTarget ||
                            'подключение интернет-эквайринга'}`,
                        `3.2. Характер отношений: ${relationshipWithNko || 'долгосрочный'}`
                    ]
                ]
            ),
            createVerticalParagraph('4. Планируемые операции по счету, в месяц', [
                [
                    createVerticalCheckboxWithTitle(
                        '4.1. Количество операций:',
                        [
                            [MonthOperationCount.lt_ten, 'до 10'],
                            [MonthOperationCount.btw_ten_to_fifty, '10 - 50'],
                            [MonthOperationCount.gt_fifty, 'свыше 50']
                        ],
                        monthOperationCount
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
                        monthOperationSum
                    )
                ]
            ]),
            createVerticalParagraph(
                '5. Адрес фактического осуществления (ведения) деятельности',
                registrationPlace || EMPTY
            ),
            createVerticalParagraph(
                '6. Тип документа, подтверждающий право нахождения по фактическому адресу',
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
            createVerticalParagraph('7. Сведения о хозяйственной деятельности', [
                [
                    createInlineCheckboxWithTitle(
                        '7.1. Наличие в штате главного бухгалтера',
                        simpleYesNo,
                        hasChiefAccountant
                    ),
                    `7.2. Штатная численность в организации: ${staffCount || EMPTY}`
                ],
                [
                    {
                        ...createVerticalCheckboxWithTitle<keyof WithoutChiefAccountant>(
                            '7.3. Бухгалтерский учет осуществляет:',
                            [
                                ['head_accounting', 'ИП лично'],
                                [
                                    'accounting_organization',
                                    `Организация ведущая бух. учет: ИНН: ${accountingOrgInn ||
                                        EMPTY}`
                                ],
                                ['individual_accountant', 'Бухгалтер – индивидуальный специалист']
                            ],
                            accounting
                        ),
                        colSpan: 2
                    }
                ]
            ]),
            createVerticalParagraph(
                '8. Принадлежность физического лица к некоторым категория граждан',
                [
                    [
                        {
                            ...createInlineCheckboxWithTitle(
                                '8.1. Принадлежность к категории ПДЛ¹',
                                simpleYesNo,
                                toYesNo(foreignPublicPerson)
                            ),
                            colSpan: 2
                        }
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '8.2. Является родственником ПДЛ',
                            simpleYesNo,
                            toYesNo(foreignRelativePerson)
                        ),
                        `8.3. Степень родства: ${pdlRelationDegree || EMPTY}`
                    ]
                ]
            ),
            createVerticalParagraph('9. Наличие выгодоприобретателя²', [
                [
                    createInlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [
                                YesNo.yes,
                                'Да (обязательное заполнение анкеты Выгодоприобретателя по форме НКО)'
                            ]
                        ],
                        toYesNo(benefitThirdParties)
                    )
                ]
            ]),
            createVerticalParagraph('10. Наличие бенефициарного владельца³', [
                [
                    createInlineCheckbox(
                        [
                            [YesNo.no, 'Нет'],
                            [
                                YesNo.yes,
                                'Да (обязательное заполнение приложение для Бенефициарного владельца по форме НКО)'
                            ]
                        ],
                        toYesNo(hasBeneficialOwner)
                    )
                ]
            ]),
            createVerticalParagraph(
                '11. Имеются ли решения о ликвидации или о любой процедуре, применяемой в деле о банкротстве',
                [[createInlineCheckbox(simpleYesNo, toYesNo(!!relationIndividualEntity))]]
            ),
            createVerticalParagraph(
                '12. Являетесь ли Вы налоговым резидентом США или иного иностранного государства',
                [[createInlineCheckbox(simpleYesNo, toYesNo(usaTaxResident))]]
            )
        ],
        prefooter: createEnding(),
        footer: [
            '¹ Публичные должностные лица, включая российские, иностранные и международные.',
            '² Выгодоприобретатель - лицо, к выгоде которого действует клиент, в том числе на основании агентского договора, договоров поручения, комиссии и доверительного управления, при проведении операций с денежными средствами и иным имуществом.',
            '³ Бенефициарный владелец - физическое лицо, которое в конечном счете прямо или косвенно (через третьих лиц) владеет (имеет преобладающее участие более 25 процентов в капитале) клиентом - юридическим лицом либо имеет возможность контролировать действия клиента. Бенефициарным владельцем клиента - физического лица считается это лицо, за исключением случаев, если имеются основания полагать, что бенефициарным владельцем является иное физическое лицо.'
        ].join('\n'),
        footerHeight: 3.6
    };
}
