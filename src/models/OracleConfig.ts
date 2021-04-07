export interface OracleConfig {
    resolutionFeePercentage: number;
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
        resolutionFeePercentage: data.resolution_fee_percentage,
    };
}
