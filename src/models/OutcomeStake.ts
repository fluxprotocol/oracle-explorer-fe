import Big from "big.js";
import { Outcome, OutcomeType } from "./DataRequestOutcome";

export interface OutcomeStake {
    outcome: Outcome;
    stake: string;
    round: number;
    dataRequestId: string;
    accountId?: string;
    finalizedOutcome?: Outcome;
}

export function combineOutcomeStakes(outcomeStakes: OutcomeStake[]): OutcomeStake[] {
    const result = new Map<string, OutcomeStake>();

    outcomeStakes.forEach((outcomeStake) => {
        let answer = '';

        if (outcomeStake.outcome.type === OutcomeType.Invalid) {
            answer = 'Invalid';
        } else {
            answer = `Answer(${outcomeStake.outcome.answer})`;
        }

        const currentItem = result.get(answer);

        if (currentItem) {
            let stake = new Big(currentItem.stake);
            stake = stake.add(outcomeStake.stake);
            result.set(answer, {
                ...currentItem,
                stake: stake.toString(),
            });
        } else {
            result.set(answer, outcomeStake);
        }
    });

    return Array.from(result.values());
}
