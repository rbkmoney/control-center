import { environment } from '../../../../environments/environment';

export const isRolesAllowed = (
    availableRoles: string[],
    searchRoles: string[],
    isEnvProd = environment.production
): boolean => {
    if (!isEnvProd) {
        return true;
    }
    if (!Array.isArray(availableRoles) || !Array.isArray(searchRoles)) {
        return false;
    }
    return searchRoles.every((r) => availableRoles.includes(r));
};
