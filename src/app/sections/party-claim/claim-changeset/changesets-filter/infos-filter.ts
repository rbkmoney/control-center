import { ChangesetInfo } from '../changeset-infos';

export const infosFilter = (info: ChangesetInfo, filters: string[]) => {
    if (
        filters.length === 0 ||
        (info.outdated && filters.includes('outdated')) ||
        (info.removed && filters.includes('removed'))
    ) {
        return false;
    } else {
        return filters.includes(info.type);
    }
};
