import { getTokenInfo } from "../services/providers/ProviderRegistry";
import { transformToOutcome } from "./DataRequestOutcome";
import { OutcomeStake } from "./OutcomeStake";
import { TokenViewModel } from "./Token";

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
    data_request?: {
        finalized_outcome: string | null;
        config: {
            stake_token: string;
        }
    }
    claim?: {
        payout: string;
    }
}

export async function transformToUserStakes(userStakes: UserStakeGraphData[], stakeToken?: TokenViewModel) {
    const result: UserStakes = {};

    for await (const userStake of userStakes) {
        const currentOutcomeStakes = result[userStake.account_id] ?? [];
        const finalStakeToken = stakeToken ?? await getTokenInfo('near', userStake.data_request?.config.stake_token ?? '');

        currentOutcomeStakes.push({
            outcome: transformToOutcome(userStake.outcome),
            stake: userStake.total_stake,
            round: userStake.round,
            dataRequestId: userStake.data_request_id,
            accountId: userStake.account_id,
            finalizedOutcome: userStake.data_request?.finalized_outcome ? transformToOutcome(userStake.data_request.finalized_outcome) : undefined,
            claimPayout: userStake.claim?.payout,
            stakeToken: finalStakeToken,
        });

        result[userStake.account_id] = currentOutcomeStakes;
    }

    return result;
}
