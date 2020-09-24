import { Questionary } from '../../../../thrift-services/ank/gen-model/questionary_manager';

export enum MenuConfigAction {
    editPartyModification = 'editPartyModification',
    deleteComment = 'deleteComment',
    deleteFile = 'deleteFile',
    removeUnsavedItem = 'removeUnsavedItem',
    extractPartyModifications = 'extractPartyModifications',
}

export interface MenuConfigItem {
    action: MenuConfigAction;
    label: string;
    data?: Questionary;
}
