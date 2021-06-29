export interface ClaimGraphData {
    payout: string;
    user_correct_stake: string;
    total_incorrect_staked: string;
    total_correct_bonded_staked: string;
}

export interface ClaimViewModel {
    payout: string;
    userCorrectStake: string;
}

export function transformToClaimViewModel(data: ClaimGraphData): ClaimViewModel {
    return {
        payout: data.payout,
        userCorrectStake: data.user_correct_stake,
    };
}
