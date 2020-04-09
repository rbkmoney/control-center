import { Questionary } from '../thrift-services/ank/gen-model/questionary_manager';
import { DocDef } from './create-questionary';
import { getDocDef as getRussianIndividualEntityDocDef } from './russian-individual-entity';
import { getDocDef as getRussianLegalEntityDocDef } from './russian-legal-entity';

export function getEntityQuestionaryDocDef(questionary: Questionary): DocDef {
    if (questionary.data.contractor.individual_entity) {
        return getRussianIndividualEntityDocDef(questionary);
    } else if (questionary.data.contractor.legal_entity) {
        return getRussianLegalEntityDocDef(questionary);
    }
    console.error('Unknown questionary');
    return null;
}
