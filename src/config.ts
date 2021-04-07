import Big from 'big.js';

export const API_URL = process.env.REACT_APP_API_URL ?? '';
export const DEFAULT_PAGINATION_LIMIT = 100;

export const NEAR_NETWORK = process.env.REACT_APP_NEAR_NETWORK as any ?? 'testnet';
export const NEAR_NULL_CONTRACT = process.env.REACT_APP_NEAR_NULL_CONTRACT ?? 'null_address.near';
export const NEAR_FLUX_TOKEN_ID = process.env.REACT_APP_NEAR_FLUX_TOKEN_ID ?? '';

Big.PE = 1000000;
