import { getTokenInfo } from "../services/providers/ProviderRegistry";
import { TokenViewModel } from "./Token";

export interface OracleConfig {
    blockHeight: string;
    date: Date;
    defaultChallengeWindowDuration: string;
    finalArbitrator: string;
    finalArbitratorInvokeAmount: string;
    gov: string;
    id: string;
    maxOutcomes: number;
    minInitialChallengeWindowDuration: string;
    resolutionFeePercentage: number;
    validityBond: string;
    stakeToken: TokenViewModel;
    bondToken: TokenViewModel;
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

export async function transformToOracleConfig(data: OracleConfigGraphData): Promise<OracleConfig> {
    const stakeToken = await getTokenInfo('near', data.stake_token);
    const bondToken = await getTokenInfo('near', data.bond_token);

    return {
        blockHeight: data.block_height,
        bondToken: bondToken,
        date: new Date(Number(data.date)),
        defaultChallengeWindowDuration: data.default_challenge_window_duration,
        finalArbitrator: data.final_arbitrator,
        finalArbitratorInvokeAmount: data.final_arbitrator_invoke_amount,
        gov: data.gov,
        id: data.id,
        maxOutcomes: data.max_outcomes,
        minInitialChallengeWindowDuration: data.min_initial_challenge_window_duration,
        resolutionFeePercentage: data.resolution_fee_percentage,
        stakeToken: stakeToken,
        validityBond: data.validity_bond,
    };
}
