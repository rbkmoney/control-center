import { DocDef } from '../create-questionary';
import {
    createVerticalParagraph,
    createHeader,
    createHeadline,
    createEnding,
    createInlineCheckboxWithTitle,
    createInlineParagraph,
    createHorizontalCheckbox
} from '../create-content';
import {
    getContactInfo,
    toYesNo,
    getIdentityDocument,
    getDate,
    getPercent,
    simpleYesNo
} from '../select-data';
import { getIndividualResidencyInfo } from './get-individual-residency-info';
import { createCompanyHeader } from './create-company-header';
import { BeneficialOwner } from '../../thrift-services/ank/gen-model/questionary';
import { toOptional } from '../../shared/utils';

const EMPTY = '';

export function getDocDef(
    beneficialOwner: BeneficialOwner,
    companyName: string,
    companyInn: string
): DocDef {
    const {
        russian_private_entity: russianPrivateEntity,
        migration_card_info: migrationCardInfo,
        residence_approve: residenceApprove,
        ownership_percentage: ownershipPercentage,
        inn,
        snils,
        pdl_relation_degree: pdlRelationDegree,
        pdl_category: pdlCategory,
        residency_info: residencyInfo,
        identity_document: identityDocument
    } = toOptional(beneficialOwner);
    const {
        birth_date: birthDate,
        fio,
        birth_place: birthPlace,
        citizenship,
        actual_address: actualAddress,
        contact_info: contactInfo
    } = toOptional(russianPrivateEntity);
    const optionalMigrationCardInfo = toOptional(migrationCardInfo);
    const optionalResidenceApprove = toOptional(residenceApprove);

    const identityDocumentInfo = getIdentityDocument(identityDocument);
    const { usaTaxResident, exceptUsaTaxResident } = getIndividualResidencyInfo(residencyInfo);
    const contact = getContactInfo(contactInfo);

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
                            'лицо, указанное в учредительных документах/выписке ЕГРЮЛ/списке участников/реестре акционеров (участник/акционер), владеющее в конечном счете более 25% в капитале компании'
                        ],
                        -1 // TODO
                    )
                ]
            ]),
            createInlineParagraph(
                '2. Процент владения капиталом юридического лица',
                getPercent(ownershipPercentage) || EMPTY
            ),
            createInlineParagraph('3. Фамилия, Имя, Отчество (при наличии)', fio || EMPTY),
            createInlineParagraph('4. Дата рождения', getDate(birthDate) || EMPTY),
            createInlineParagraph('5. Место рождения', birthPlace || EMPTY),
            createInlineParagraph('6. Гражданство', citizenship || 'РФ'), // TODO: move to questionary input
            createInlineParagraph('7. ИНН (при наличии)', inn || EMPTY),
            createInlineParagraph('8. Реквизиты документа, удостоверяющего личность', [
                [`8.1. Вид документа: ${identityDocumentInfo.name || EMPTY}`],
                [`8.2. Серия и номер: ${identityDocumentInfo.seriesNumber || EMPTY}`],
                [
                    `8.3. Наименование органа, выдавшего документ, код подразделения (при наличии): ${identityDocumentInfo.issuer ||
                        EMPTY}`
                ],
                [`8.4. Дата выдачи: ${getDate(identityDocumentInfo.issuedAt) || EMPTY}`]
            ]),
            createInlineParagraph('9. Данные миграционной карты¹', [
                [`9.1. Номер карты: ${optionalMigrationCardInfo.card_number || EMPTY}`],
                [
                    `9.2. Дата начала срока пребывания в РФ: ${getDate(
                        optionalMigrationCardInfo.beginning_date
                    ) || EMPTY}`
                ],
                [
                    `9.3. Дата окончания срока пребывания в РФ: ${getDate(
                        optionalMigrationCardInfo.expiration_date
                    ) || EMPTY}`
                ]
            ]),
            createInlineParagraph(
                '10. Данные документа, подтверждающего право иностранного гражданина или лица без гражданства на пребывание (проживание) в РФ1¹',
                [
                    [`10.1. Вид документа: ${optionalResidenceApprove.name || EMPTY}`],
                    [`10.2. Серия (при наличии): ${optionalResidenceApprove.series || EMPTY}`],
                    [`10.3. Номер документа: ${optionalResidenceApprove.number || EMPTY}`],
                    [
                        `10.4. Дата начала срока действия: ${getDate(
                            optionalResidenceApprove.beginning_date
                        ) || EMPTY}`
                    ],
                    [
                        `10.5. Дата окончания срока действия: ${getDate(
                            optionalResidenceApprove.expiration_date
                        ) || EMPTY}`
                    ]
                ]
            ),
            createInlineParagraph(
                '11. Адрес места жительства (регистрации) или места пребывания',
                actualAddress || EMPTY
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
                            toYesNo(pdlCategory)
                        )
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '14.2. Является родственником ПДЛ',
                            simpleYesNo,
                            toYesNo(!!pdlRelationDegree)
                        ),
                        `14.3. Степень родства: ${pdlRelationDegree || EMPTY}`
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '14.4. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом США?',
                            simpleYesNo,
                            toYesNo(usaTaxResident)
                        )
                    ],
                    [
                        createInlineCheckboxWithTitle(
                            '14.5. Является ли бенефициарный владелец налогоплательщиком/налоговым резидентом иного иностранного государства (кроме США)?',
                            simpleYesNo,
                            toYesNo(exceptUsaTaxResident)
                        )
                    ]
                ]
            )
        ],
        prefooter: createEnding(),
        footer: [
            '¹ Заполняется только для иностранных граждан и лиц без гражданства, находящихся на территории РФ в случае, если необходимость наличия у них данного документа предусмотрена законодательством РФ',
            '² Публичные должностные лица, включая российские, иностранные и международные.'
        ].join('\n'),
        footerHeight: 3.1
    };
}
