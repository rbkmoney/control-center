import { QuestionaryData } from '../../thrift-services/ank/gen-model/questionary_manager';
import { PartyModification } from '../../thrift-services/damsel/gen-model/claim_management';
import { toContractorModification } from './to-contractor-modification';
import { toInternationalLegalEntity } from './to-international-legal-entity';
import { toRussianLegalEntity } from './to-russian-legal-entity';

export const toLegalEntityPartyModification = (
    d: QuestionaryData,
    contractorID: string
): PartyModification =>
    toContractorModification(
        {
            creation: {
                legal_entity: {
                    russian_legal_entity: d.contractor?.legal_entity?.russian_legal_entity
                        ? toRussianLegalEntity(d)
                        : undefined,
                    international_legal_entity: d.contractor?.legal_entity
                        ?.international_legal_entity
                        ? toInternationalLegalEntity(d)
                        : undefined,
                },
            },
        },
        contractorID
    );
