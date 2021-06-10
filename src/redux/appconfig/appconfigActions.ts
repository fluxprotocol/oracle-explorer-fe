import { getAppConfigForProvider } from "../../services/providers/ProviderRegistry";
import { setAppConfig, setAppConfigLoading } from "./appconfig";

export function loadAppConfig() {
    return async (dispatch: Function) => {
        dispatch(setAppConfigLoading(true));

        const config = await getAppConfigForProvider('near');

        dispatch(setAppConfig(config));
        dispatch(setAppConfigLoading(false));
    };
}
