export interface OracleConfig {
    blockHeight: string;
    bondToken: string;
    date: Date;
    defaultChallengeWindowDuration: string;
    finalArbitrator: string;
    finalArbitratorInvokeAmount: string;
    gov: string;
    id: string;
    maxOutcomes: number;
    minInitialChallengeWindowDuration: string;
    resolutionFeePercentage: number;
    stakeToken: string;
    validityBond: string;
}

export interface OracleConfigGraphData {
    block_height: string;
    bond_token: string;
    date: string;
    default_challenge_window_duration: string;
    final_arbitrator: string;
    final_arbitrator_invoke_amount: string;
    gov: string;
    id: string;
    max_outcomes: number;
    min_initial_challenge_window_duration: string;
    resolution_fee_percentage: number;
    stake_token: string;
    validity_bond: string;
}

export function transformToOracleConfig(data: OracleConfigGraphData): OracleConfig {
    return {
        blockHeight: data.block_height,
        bondToken: data.bond_token,
        date: new Date(Number(data.date)),
        defaultChallengeWindowDuration: data.default_challenge_window_duration,
        finalArbitrator: data.final_arbitrator,
        finalArbitratorInvokeAmount: data.final_arbitrator_invoke_amount,
        gov: data.gov,
        id: data.id,
        maxOutcomes: data.max_outcomes,
        minInitialChallengeWindowDuration: data.min_initial_challenge_window_duration,
        resolutionFeePercentage: data.resolution_fee_percentage,
        stakeToken: data.stake_token,
        validityBond: data.validity_bond,
    };
}
