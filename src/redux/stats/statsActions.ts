import { COINGECKO_TOKEN_TICKER } from "../../config";
import { getTokenMarketInfoByTicker } from "../../services/DashboardService";
import { getAllDataRequests } from "../../services/DataRequestService"
import cache from "../../utils/cache";
import { setLatestRequestsStat, setTokenMarketCapStat, setTokenPriceStat, setTotalRequestsStat } from "./stats";

export function loadStats() {
    return async (dispatch: Function) => {
        getAllDataRequests({
            limit: 10,
            offset: 0,
        }, { onlyArbitratorRequests: false }).then((result) => {
            dispatch(setTotalRequestsStat(result.total.toString()));
            dispatch(setLatestRequestsStat(result.items));
        });

        cache('flx_token_price', async () => {
            return getTokenMarketInfoByTicker(COINGECKO_TOKEN_TICKER);
        }, 10000).then((result) => {
            dispatch(setTokenPriceStat(result.price));
            dispatch(setTokenMarketCapStat(result.marketCap));
        });
    }
}
