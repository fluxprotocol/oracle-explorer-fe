import Big from "big.js";
import { Outcome, transformToOutcome } from "./DataRequestOutcome";

export interface OutcomeStake {
    outcome: Outcome;
    stake: string;
}


export interface ResolutionWindow {
    round: number;
    bondedOutcome?: string;
    outcomeStakes: OutcomeStake[];
    endTime: Date;
    bondSize: string;
    totalStaked: string;
    userStakes: {
        [accountId: string]: OutcomeStake[];
    }
}

export interface ResolutionWindowGraphData {
    block_height: string;
    bond_size: string;
    date: string;
    dr_id: string;
    end_time: string;
    id: string;
    round: number;
    outcome_stakes: {
        data_request_id: string;
        id: string;
        round: number;
        total_stake: string;
        outcome: string;
    }[];
    user_stakes: {
        account_id: string;
        data_request_id: string;
        id: string;
        outcome: string;
        round: string;
        total_stake: string;
    }[];
}

export function transformToResolutionWindow(data: ResolutionWindowGraphData): ResolutionWindow {
    const userStakes: ResolutionWindow['userStakes'] = {};
    let totalStaked = new Big(0);

    data.user_stakes.forEach((userStake) => {
        const currentOutcomeStakes = userStakes[userStake.account_id] ?? [];

        currentOutcomeStakes.push({
            outcome: transformToOutcome(userStake.outcome),
            stake: userStake.total_stake,
        });

        userStakes[userStake.account_id] = currentOutcomeStakes;
    });

    const outcomeStakes = data.outcome_stakes.map((os) => {
        totalStaked = totalStaked.add(os.total_stake);

        return {
            outcome: transformToOutcome(os.outcome),
            stake: os.total_stake,
        }
    });

    return {
        bondSize: data.bond_size,
        endTime: new Date(Number(data.end_time) / 1000000),
        outcomeStakes,
        totalStaked: totalStaked.toString(),
        round: data.round,
        userStakes
    };
}
