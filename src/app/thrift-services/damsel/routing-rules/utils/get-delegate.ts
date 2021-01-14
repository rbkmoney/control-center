import { RoutingDelegate, RoutingRulesObject } from '../../gen-model/domain';

export function getDelegate(ruleset: RoutingRulesObject, delegateIdx: number): RoutingDelegate {
    return ruleset?.data?.decisions?.delegates?.[delegateIdx];
}
