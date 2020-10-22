import { PaymentRoutingRulesObject } from '../gen-model/domain';

export function getRulesetDelegate(mainRuleset: PaymentRoutingRulesObject, rulesetRefID: number) {
    return mainRuleset?.data?.decisions?.delegates?.find((d) => d?.ruleset?.id === rulesetRefID);
}
