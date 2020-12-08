import maxBy from 'lodash-es/maxBy';

import { Party, SearchHit } from '../gen-model/deanonimus';

export const getMaxSearchHitParty = (searchHits: SearchHit[]): Party | null => {
    const maxSearchHit = maxBy(searchHits, (searchHit) => searchHit.score);
    return maxSearchHit?.party;
};
