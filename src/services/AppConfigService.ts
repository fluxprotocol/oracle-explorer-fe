import { APP_CONFIG_URL } from "../config";
import { AppConfig, ImportantMessage } from "../models/AppConfig";
import csvtojson from 'csvtojson';

export async function getDefaultAppConfig(): Promise<AppConfig> {
    try {
        const response = await (await fetch(APP_CONFIG_URL)).text();
        const config = await csvtojson().fromString(response);

        const importantMessages: ImportantMessage[] = [];

        config.forEach((message) => {
            if (message.activate !== '1') return;

            importantMessages.push({
                key: message.key,
                message: message.value,
                type: message.type,
            });
        });

        return {
            bondTokenDecimals: 18,
            bondTokenSymbol: '?',
            importantMessages,
            nativeTokenDecimals: 18,
            nativeTokenSymbol: '?',
            stakeTokenDecimals: 18,
            stakeTokenSymbol: '?',
        };
    } catch (error) {
        console.error('[getDefaultAppConfig]', error);
        return {
            bondTokenDecimals: 18,
            bondTokenSymbol: '?',
            importantMessages: [],
            nativeTokenDecimals: 18,
            nativeTokenSymbol: '?',
            stakeTokenDecimals: 18,
            stakeTokenSymbol: '?',
        }
    }
}
