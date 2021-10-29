import metadata from '../../../assets/api-meta/dominant-cache.json';
import { createThriftInstanceUtils } from '../../thrift-services';
import * as dominant_cache from './dominant-cache/gen-nodejs/dominant_cache_types';

export const {
    createThriftInstance: createDominantCacheInstance,
    thriftInstanceToObject: dominantCacheInstanceToObject,
} = createThriftInstanceUtils(metadata, {
    dominant_cache,
});
