import Big from "big.js";
import { Outcome, transformToOutcome } from "./DataRequestOutcome";
import { OutcomeStake } from "./OutcomeStake";
import { transformToUserStakes, UserStakeGraphData, UserStakes } from "./UserStakes";


export interface ResolutionWindow {
    round: number;
    bondedOutcome?: Outcome;
    outcomeStakes: OutcomeStake[];
    endTime: Date;
    bondSize: string;
    totalStaked: string;
    userStakes: UserStakes;
}

export interface ResolutionWindowGraphData {
    block_height: string;
    bond_size: string;
    date: string;
    dr_id: string;
    end_time: string;
    id: string;
    round: number;
    bonded_outcome: null | string;
    outcome_stakes: {
        data_request_id: string;
        id: string;
        round: number;
        total_stake: string;
        outcome: string;
    }[];
    user_stakes: UserStakeGraphData[];
}

export function transformToResolutionWindow(data: ResolutionWindowGraphData): ResolutionWindow {
    let totalStaked = new Big(0);

    const outcomeStakes: OutcomeStake[] = data.outcome_stakes.map((os) => {
        totalStaked = totalStaked.add(os.total_stake);

        return {
            outcome: transformToOutcome(os.outcome),
            stake: os.total_stake,
            dataRequestId: os.data_request_id,
            round: os.round,
        }
    });

    return {
        bondSize: data.bond_size,
        endTime: new Date(Number(data.end_time) / 1000000),
        outcomeStakes,
        totalStaked: totalStaked.toString(),
        round: data.round,
        userStakes: transformToUserStakes(data.user_stakes),
        bondedOutcome: data.bonded_outcome ? transformToOutcome(data.bonded_outcome) : undefined,
    };
}
