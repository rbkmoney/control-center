import * as DomainTypes from '../../../gen-nodejs/domain_types';
import {
    TerminalDecision,
    Predicate,
    Condition,
    PartyCondition,
    PartyConditionDefinition,
    TerminalSelector,
    TerminalRef
} from '../../../../damsel/index';

const toPartyConditionDefinitionGen = (definition: PartyConditionDefinition): PartyConditionDefinition => {
    const definitionGen = new DomainTypes.PartyConditionDefinition();
    definitionGen.shop_is = definition.shopIs;
    return definitionGen;
};

const toPartyConditionGen = (partyCondition: PartyCondition): PartyCondition => {
    const partyConditionGen = new DomainTypes.PartyCondition();
    partyConditionGen.id = partyCondition.id;
    partyConditionGen.definition = toPartyConditionDefinitionGen(partyCondition.definition);
    return partyConditionGen;
};

const toConditionGen = (condition: Condition): Condition => {
    const conditionDef = new DomainTypes.Condition();
    if (condition.party) {
        conditionDef.party = toPartyConditionGen(condition.party);
    }
    return conditionDef;
};

const toPredicateGen = (predicate: Predicate): Predicate => {
    const predicateGen = new DomainTypes.Predicate();
    if (predicate.condition) {
        predicateGen.condition = toConditionGen(predicate.condition);
    }
    return predicateGen;
};

const toTerminalRefGen = (ref: TerminalRef): TerminalRef => {
    const terminalRefGen = new DomainTypes.TerminalRef();
    terminalRefGen.id = ref.id;
    return terminalRefGen;
};

const toTerminalSelectorGen = (selector: TerminalSelector): TerminalSelector => {
    const selectorGen = new DomainTypes.TerminalSelector();
    if (selector.value) {
        selectorGen.value = selector.value.map((ref) => toTerminalRefGen(ref));
    }
    return selectorGen;

};

export const toGenTerminalDecision = (terminalDecision: TerminalDecision): TerminalDecision => {
    const terminalDecisionGen = new DomainTypes.TerminalDecision();
    terminalDecisionGen.if_ = toPredicateGen(terminalDecision.if_);
    terminalDecisionGen.then_ = toTerminalSelectorGen(terminalDecision.then_);
    return terminalDecisionGen;
};
