import { COINGECKO_API_URL } from '../config';

export interface TokenMarketInfoResponse {
    price: number;
    marketCap: number;
}

export async function getTokenMarketInfoByTicker(ticker: string, currency = 'usd'): Promise<TokenMarketInfoResponse> {
    try {
        const response = await fetch(`${COINGECKO_API_URL}/coins/${ticker}?localization=false`);
        const data = await response.json();

        return {
            price: data.market_data.current_price[currency],
            marketCap: data.market_data.market_cap[currency],
        };
    } catch (error) {
        console.error('[getTokenMarketInfoByTicker]', error);

        return {
            marketCap: 0,
            price: 0,
        };
    }
}


