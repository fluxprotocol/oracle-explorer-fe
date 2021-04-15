import Big from "big.js";
import { Outcome, transformToOutcome } from "./DataRequestOutcome";
import { OracleConfig, OracleConfigGraphData, transformToOracleConfig } from "./OracleConfig";
import { ResolutionWindow, ResolutionWindowGraphData, transformToResolutionWindow } from "./ResolutionWindow";

export interface DataRequestSource {
    endPoint: string;
    sourcePath: string;
}
export interface DataRequestListItem {
    id: string;
    date: Date;
    requestor: string;
    finalized_outcome?: Outcome;
}

export interface DataRequestViewModel extends DataRequestListItem {
    config: OracleConfig;
    sources: DataRequestSource[];
    outcomes?: string[];
    resolutionWindows: ResolutionWindow[];
    totalStaked: string;
    finalized_outcome?: Outcome;
    targetContract: string;
    finalArbitratorTriggered: boolean;
}

export interface DataRequestGraphData {
    id: string;
    block_height: string;
    date: string;
    final_arbitrator_triggered: boolean;
    global_config_id: string;
    initial_challenge_period: string;
    outcomes: string[];
    requestor: string;
    target_contract: string;
    finalized_outcome: string | null;
    sources: {
        end_point: string;
        source_path: string;
    }[];
    config: OracleConfigGraphData;
    resolution_windows: ResolutionWindowGraphData[];
}

export function transformToDataRequestListItem(data: DataRequestGraphData): DataRequestListItem {
    return {
        id: data.id,
        date: new Date(Number(data.date)),
        requestor: data.requestor,
        finalized_outcome: data.finalized_outcome ? transformToOutcome(data.finalized_outcome) : undefined,
    };
}

export function transformToDataRequestViewModel(data: DataRequestGraphData): DataRequestViewModel {
    const resolutionWindows = data.resolution_windows.map(rw => transformToResolutionWindow(rw));
    const totalStaked = resolutionWindows.reduce((prev, curr) => prev.add(curr.totalStaked), new Big(0));

    return {
        ...transformToDataRequestListItem(data),
        config: transformToOracleConfig(data.config),
        resolutionWindows,
        sources: data.sources.map((s) => ({
            endPoint: s.end_point,
            sourcePath: s.source_path,
        })),
        outcomes: data.outcomes,
        totalStaked: totalStaked.toString(),
        finalized_outcome: data.finalized_outcome ? transformToOutcome(data.finalized_outcome) : undefined,
        targetContract: data.target_contract,
        finalArbitratorTriggered: data.final_arbitrator_triggered,
    };
}

export function canDataRequestBeFinalized(dataRequest: DataRequestViewModel): boolean {
    // Already finalized
    if (dataRequest.finalized_outcome) {
        return false;
    }

    const currentResolutionWindow = dataRequest.resolutionWindows[dataRequest.resolutionWindows.length - 1];
    if (!currentResolutionWindow) return false;


    const now = new Date().getTime();

    // Latest resolution window must end
    if (currentResolutionWindow.endTime.getTime() >= now) {
        return false;
    }

    if (!currentResolutionWindow.filled) {
        // The window has not been filled
        // If it's the first round we cannot finalize till it's completely filled
        if (currentResolutionWindow.round === 0) {
            return false;
        }
    }

    // Window has been filled, end time is met and we are not the first round
    // Meaning that the previous round was filled and ready to be finalized
    return true;
}
