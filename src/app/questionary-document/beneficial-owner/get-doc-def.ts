import get from 'lodash-es/get';

import { toOptional } from '../../shared/utils';
import { BeneficialOwner } from '../../thrift-services/ank/gen-model/questionary';
import {
    createEnding,
    createHeader,
    createHeadline,
    createHorizontalCheckbox,
    createInlineCheckboxWithTitle,
    createInlineParagraph,
    createVerticalParagraph,
} from '../create-content';
import { DocDef } from '../create-questionary';
import {
    getContactInfo,
    getDate,
    getIdentityDocument,
    getPercent,
    simpleYesNo,
    toYesNo,
} from '../select-data';
import { createCompanyHeader } from './create-company-header';
import { getIndividualResidencyInfo } from './get-individual-residency-info';

const EMPTY = '';

export function getDocDef(
    beneficialOwner: BeneficialOwner,
    companyName: string,
    companyInn: string
): DocDef {
    const {
        russian_private_entity,
        migration_card_info,
        residence_approve,
        ownership_percentage,
        inn,
        snils,
        pdl_relation_degree,
        pdl_category,
        residency_info,
        identity_document,
    } = toOptional(beneficialOwner);
    const { birth_date, fio, birth_place, citizenship, actual_address, contact_info } = toOptional(
        russian_private_entity
    );
    const optionalMigrationCardInfo = toOptional(migration_card_info);
    const optionalResidenceApprove = toOptional(residence_approve);

    const identityDocumentInfo = getIdentityDocument(identity_document);
    const { usaTaxResident, exceptUsaTaxResident } = getIndividualResidencyInfo(residency_info);
    const contact = getContactInfo(contact_info);

    return {
        content: [
            createHeader('Приложение №'),
            createCompanyHeader(companyName, companyInn),
            createHeadline('АНКЕТА ФИЗИЧЕСКОГО ЛИЦА - БЕНЕФИЦИАРНОГО ВЛАДЕЛЬЦА'),
            createVerticalParagraph('1. Бенефициарный владелец', [
                [
                    createHorizontalCheckbox(
                        [
                            'лицо, не указанное в учредительных документах/выписке ЕГРЮЛ/списке участников/реестре акционеров, но которое косвенно владеет более 25% в капитале компании или контролирует действия компании',
                            'лицо, указанное в учредительных документах/выписке ЕГРЮЛ/списке участников/реестре акционеров (участник/акционер), владеющее в конечном счете более 25% в капитале компании',
                        ],
                        -1 // TODO
                    ),
                ],
            ]),
            createInlineParagraph(
                '2. Процент владения капиталом юридического лица',
                getPercent(ownership_percentage) || EMPTY
            ),
            createInlineParagraph('3. Фамилия, Имя, Отчество (при наличии)', fio || EMPTY),
            createInlineParagraph('4. Дата рождения', getDate(birth_date) || EMPTY),
            createInlineParagraph('5. Место рождения', birth_place || EMPTY),
            createInlineParagraph('6. Гражданство', citizenship || 'РФ'), // TODO: move to questionary input
            createInlineParagraph('7. ИНН (при наличии)', inn || EMPTY),
            createInlineParagraph('8. Реквизиты документа, удостоверяющего личность', [
                [`8.1. Вид документа: ${get(identityDocumentInfo, 'name') || EMPTY}`],
                [`8.2. Серия и номер: ${get(identityDocumentInfo, 'seriesNumber') || EMPTY}`],
                [
                    `8.3. Наименование органа, выдавшего документ, код подразделения (при наличии): ${
                        identityDocumentInfo.issuer || EMPTY
                    }`,
                ],
                [`8.4. Дата выдачи: ${getDate(get(identityDocumentInfo, 'issuedAt')) || EMPTY}`],
            ]),
            createInlineParagraph('9. Данные миграционной карты¹', [
                [`9.1. Номер карты: ${get(optionalMigrationCardInfo, 'card_number') || EMPTY}`],
                [
                    `9.2. Дата начала срока пребывания в РФ: ${
                        getDate(get(optionalMigrationCardInfo, 'beginning_date')) || EMPTY
                    }`,
                ],
                [
                    `9.3. Дата окончания срока пребывания в РФ: ${
                        getDate(get(optionalMigrationCardInfo, 'expiration_date')) || EMPTY
                    }`,
                ],
            ]),
            createInlineParagraph(
                '10. Данные документа, подтверждающего право иностранного гражданина или лица без гражданства на пребывание (проживание) в РФ¹',
                [
                    [`10.1. Вид документа: ${get(optionalResidenceApprove, 'name') || EMPTY}`],
                    [
                        `10.2. Серия (при наличии): ${
                            get(optionalResidenceApprove, 'series') || EMPTY
                        }`,
                    ],
                    [`10.3. Номер документа: ${get(optionalResidenceApprove, 'number') || EMPTY}`],
                    [
                        `10.4. Дата начала срока действия: ${
                            getDate(get(optionalResidenceApprove, 'beginning_date')) || EMPTY
                        }`,
                    ],
                    [
                        `10.5. Дата окончания срока действия: ${
                            getDate(get(optionalResidenceApprove, 'expiration_date')) || EMPTY
                        }`,
                    ],
                ]
            ),
            createInlineParagraph(
                '11. Адрес места жительства (регистрации) или места пребывания',
                actual_address || EMPTY
            ),
            createInlineParagraph('12. СНИЛС (при наличии)', snils || EMPTY),
            createInlineParagraph('13. Контактная информация (телефон/email)', contact || EMPTY),
            createVerticalParagraph(
                '14. Принадлежность физического лица к некоторым категориям лиц',
                [
                    [
                        createInlineCheckboxWithTitle(
                            '14.1. Принадлежность к категории ПДЛ²',
                            simpleYesNo,
                            toYesNo(pdl_category)
                        ),
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '14.2. Является родственником ПДЛ',
                            simpleYesNo,
                            toYesNo(!!pdl_relation_degree)
                        ),
                        `14.3. Степень родства: ${pdl_relation_degree || EMPTY}`,
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '14.4. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом США?',
                            simpleYesNo,
                            toYesNo(usaTaxResident)
                        ),
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '14.5. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом иного иностранного государства (кроме США)?',
                            simpleYesNo,
                            toYesNo(exceptUsaTaxResident)
                        ),
                    ],
                ]
            ),
        ],
        prefooter: createEnding(),
        footer: [
            '¹ Заполняется только для иностранных граждан и лиц без гражданства, находящихся на территории РФ в случае, если необходимость наличия у них данного документа предусмотрена законодательством РФ',
            '² Публичные должностные лица, включая российские, иностранные и международные.',
        ].join('\n'),
        footerHeight: 3.1,
    };
}
