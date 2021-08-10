import Big from 'big.js';

export const API_URL = process.env.REACT_APP_API_URL ?? '';
export const COINGECKO_API_URL = process.env.REACT_APP_COINGECKO_API_URL || '';
export const DEFAULT_PAGINATION_LIMIT = 10;
export const COINGECKO_TOKEN_TICKER = 'near';

export const NEAR_NETWORK = process.env.REACT_APP_NEAR_NETWORK as any ?? 'testnet';
export const NEAR_NULL_CONTRACT = process.env.REACT_APP_NEAR_NULL_CONTRACT ?? 'null_address.near';
export const NEAR_ORACLE_CONTRACT_ID = process.env.REACT_APP_NEAR_ORACLE_CONTRACT_ID ?? 'oracle.flux-dev'
export const NEAR_MAX_GAS = '250000000000000';
export const STORAGE_BASE = '30000000000000000000000';
export const HOME_REFRESH_INTERVAL = 2000;
export const REQUEST_DETAIL_REFRESH_INTERVAL = 5000;
export const REQUEST_LIST_REFRESH_INTERVAL = 5000;

Big.PE = 1000000;
