import Big from "big.js";
import { OracleConfig, OracleConfigGraphData, transformToOracleConfig } from "./OracleConfig";
import { ResolutionWindow, ResolutionWindowGraphData, transformToResolutionWindow } from "./ResolutionWindow";

export interface DataRequestSource {
    endPoint: string;
    sourcePath: string;
}
export interface DataRequestListItem {
    id: string;
    date: string;
    requestor: string;
}

export interface DataRequestViewModel extends DataRequestListItem {
    config: OracleConfig;
    sources: DataRequestSource[];
    outcomes?: string[];
    resolutionWindows: ResolutionWindow[];
    totalStaked: string;
}

export interface DataRequestGraphData {
    id: string;
    block_height: string;
    date: string;
    final_arbitrator_triggered: string;
    global_config_id: string;
    initial_challenge_period: string;
    outcomes: string[];
    requestor: string;
    target_contract: string;
    sources: {
        end_point: string;
        source_path: string;
    }[];
    config: OracleConfigGraphData;
    resolution_windows: ResolutionWindowGraphData[];
}

export function transformToDataRequestViewModel(data: DataRequestGraphData): DataRequestViewModel {
    const resolutionWindows = data.resolution_windows.map(rw => transformToResolutionWindow(rw));
    const totalStaked = resolutionWindows.reduce((prev, curr) => prev.add(curr.totalStaked), new Big(0));

    return {
        id: data.id,
        config: transformToOracleConfig(data.config),
        resolutionWindows,
        date: data.date,
        requestor: data.requestor,
        sources: data.sources.map((s) => ({
            endPoint: s.end_point,
            sourcePath: s.source_path,
        })),
        outcomes: data.outcomes,
        totalStaked: totalStaked.toString(),
    };
}
