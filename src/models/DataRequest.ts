import { OracleConfig } from "./OracleConfig";

export interface DataRequestSource {
    endPoint: string;
    sourcePath: string;
}

export interface DataRequestRound {
    round: number;
    outcomeStakes: {
        [outcome: string]: string | undefined;
    };
    userStakes: {
        [accountId: string]: DataRequestRound['outcomeStakes'];
    }
}

export interface DataRequestViewModel {
    id: string;
    requestor: string;
    config: OracleConfig;
    settlementTime: Date;
    sources: DataRequestSource[];
    outcomes?: string[];
    rounds: DataRequestRound[];
}
