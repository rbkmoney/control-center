export enum MenuConfigAction {
    editPartyModification = 'editPartyModification',
    deleteComment = 'deleteComment',
    deleteFile = 'deleteFile',
    removeUnsavedItem = 'removeUnsavedItem',
}

export interface MenuConfigItem {
    action: MenuConfigAction;
    label: string;
}
