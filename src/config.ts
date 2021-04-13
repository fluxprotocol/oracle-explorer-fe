import Big from 'big.js';

export const API_URL = process.env.REACT_APP_API_URL ?? '';
export const DEFAULT_PAGINATION_LIMIT = 10;

export const NEAR_NETWORK = process.env.REACT_APP_NEAR_NETWORK as any ?? 'testnet';
export const NEAR_NULL_CONTRACT = process.env.REACT_APP_NEAR_NULL_CONTRACT ?? 'null_address.near';
export const NEAR_FLUX_TOKEN_ID = process.env.REACT_APP_NEAR_FLUX_TOKEN_ID ?? '';
export const NEAR_ORACLE_CONTRACT_ID = process.env.REACT_APP_NEAR_ORACLE_CONTRACT_ID ?? 'oracle.flux-dev'
export const NEAR_MAX_GAS = '200000000000000';
export const STORAGE_BASE = '30000000000000000000000';

Big.PE = 1000000;
