import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';

export enum MenuConfigAction {
    /* eslint-disable @typescript-eslint/naming-convention */
    editPartyModification = 'editPartyModification',
    deleteComment = 'deleteComment',
    deleteFile = 'deleteFile',
    removeUnsavedItem = 'removeUnsavedItem',
    extractPartyModifications = 'extractPartyModifications',
    /* eslint-enable @typescript-eslint/naming-convention */
}

export interface MenuConfigItem {
    action: MenuConfigAction;
    label: string;
    data?: Questionary;
}
