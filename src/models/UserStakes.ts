import { transformToOutcome } from "./DataRequestOutcome";
import { OutcomeStake } from "./OutcomeStake";

export interface UserStakes {
    [accountId: string]: OutcomeStake[];
}

export interface UserStakeGraphData {
    account_id: string;
    data_request_id: string;
    id: string;
    outcome: string;
    round: number;
    total_stake: string;
}

export function transformToUserStakes(userStakes: UserStakeGraphData[]) {
    const result: UserStakes = {};

    userStakes.forEach((userStake) => {
        const currentOutcomeStakes = result[userStake.account_id] ?? [];

        currentOutcomeStakes.push({
            outcome: transformToOutcome(userStake.outcome),
            stake: userStake.total_stake,
            round: userStake.round,
            dataRequestId: userStake.data_request_id,
            accountId: userStake.account_id,
        });

        result[userStake.account_id] = currentOutcomeStakes;
    });

    return result;
}