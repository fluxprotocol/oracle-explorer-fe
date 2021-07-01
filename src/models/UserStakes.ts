import { getTokenInfo } from "../services/providers/ProviderRegistry";
import { isSameOutcome, Outcome, transformToOutcome } from "./DataRequestOutcome";
import { OutcomeStake } from "./OutcomeStake";
import { ResolutionWindow } from "./ResolutionWindow";
import { TokenViewModel } from "./Token";

/** @deprecated */
export interface UserStakes {
    [accountId: string]: OutcomeStake[];
}

export interface UserStakeViewModel {
    outcome: Outcome;
    accountId: string;
    dataRequestId: string;
    round: number;
    totalStake: string;
    bonded: boolean;
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

export function transformToUserStakesViewModel(userStake: UserStakeGraphData, resolutionWindows: ResolutionWindow[] = []): UserStakeViewModel {
    let bonded = false;
    const stakedResolutionWindow = resolutionWindows[userStake.round];
    const stakedOutcome = transformToOutcome(userStake.outcome);

    if (stakedResolutionWindow && isSameOutcome(stakedResolutionWindow.bondedOutcome, stakedOutcome)) {
        bonded = true;
    }

    return {
        outcome: stakedOutcome,
        accountId: userStake.account_id,
        dataRequestId: userStake.data_request_id,
        totalStake: userStake.total_stake,
        round: userStake.round,
        bonded,
    }
}

export async function transformToUserStakes(userStakes: UserStakeGraphData[], stakeToken?: TokenViewModel) {
    // TODO: Investigate if this is still needed
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
            bonded: false,
        });

        result[userStake.account_id] = currentOutcomeStakes;
    }

    return result;
}
