import { Outcome } from "./DataRequestOutcome";
import { OracleConfig } from "./OracleConfig";

export interface DataRequestSource {
    endPoint: string;
    sourcePath: string;
}

export interface OutcomeStake {
    outcome: Outcome;
    stake: string;
}

export interface DataRequestResolutionWindow {
    round: number;
    bondedOutcome?: string;
    outcomeStakes: OutcomeStake[];
    endTime: Date;
    bondSize: string;
    userStakes: {
        [accountId: string]: OutcomeStake[];
    }
}

export interface DataRequestViewModel {
    id: string;
    requestor: string;
    config: OracleConfig;
    settlementTime: Date;
    sources: DataRequestSource[];
    outcomes?: string[];
    resolutionWindows: DataRequestResolutionWindow[];
}
