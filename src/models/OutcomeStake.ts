import Big from "big.js";
import { Outcome, OutcomeType } from "./DataRequestOutcome";
import { TokenViewModel } from "./Token";

export interface OutcomeStake {
    outcome: Outcome;
    stake: string;
    round: number;
    dataRequestId: string;
    accountId?: string;
    finalizedOutcome?: Outcome;
    claimPayout?: string;
    stakeToken: TokenViewModel;
}

export function combineOutcomeStakes(outcomeStakes: OutcomeStake[] = []): OutcomeStake[] {
    const result = new Map<string, OutcomeStake>();

    outcomeStakes.forEach((outcomeStake) => {
        let answer = '';

        if (outcomeStake.outcome.type === OutcomeType.Invalid) {
            answer = 'Invalid';
        } else {
            answer = `Answer(${outcomeStake.outcome.answer})`;
        }

        const internalId = `${answer}_${outcomeStake.dataRequestId}`;
        const currentItem = result.get(internalId);

        if (currentItem) {
            let stake = new Big(currentItem.stake);
            stake = stake.add(outcomeStake.stake);
            result.set(internalId, {
                ...currentItem,
                stake: stake.toString(),
            });
        } else {
            result.set(internalId, outcomeStake);
        }
    });

    return Array.from(result.values());
}
