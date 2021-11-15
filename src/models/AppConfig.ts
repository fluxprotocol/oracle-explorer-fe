export interface ImportantMessage {
    key: string;
    type: 'success' | 'info' | 'warning' | 'error';
    message: string;
}

export interface AppConfig {
    stakeTokenSymbol: string;
    stakeTokenDecimals: number;
    bondTokenSymbol: string;
    bondTokenDecimals: number;
    nativeTokenSymbol: string;
    nativeTokenDecimals: number;

    importantMessages: ImportantMessage[];
}
