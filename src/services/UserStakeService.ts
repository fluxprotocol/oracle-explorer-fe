import gql from "graphql-tag";
import { combineOutcomeStakes, OutcomeStake } from "../models/OutcomeStake";
import { Pagination } from "../models/Pagination";
import { transformToUserStakes, UserStakes } from "../models/UserStakes";
import { graphqlClient } from "./GraphQLService";

async function getUserStakesByRequestIdAndAccountId(requestId: string, accountId: string) {
    try {
        const response = await graphqlClient.query({
            query: gql`
                    query GetUserStakes($requestId: String!, $accountId: String!) {
                        stakes: getUserStakesByRequestId(id: $requestId, accountId: $accountId) {
                            data_request_id
                            account_id
                            id
                            outcome
                            round
                            total_stake
                            claim {
                                payout
                            }
                        }
                    }
                `,
            variables: {
                requestId,
                accountId,
            }
        });

        const userStakes = transformToUserStakes(response.data.stakes);
        return userStakes;
    } catch (error) {
        console.error('[getUserStakesByRequestIdAndAccountId]', error);
        return {};
    }
}

export async function getUserStakesByRequestId(requestId: string, accountId?: string): Promise<UserStakes> {
    try {
        if (accountId) {
            return getUserStakesByRequestIdAndAccountId(requestId, accountId);
        }

        const response = await graphqlClient.query({
            query: gql`
                    query GetUserStakes($requestId: String!) {
                        stakes: getUserStakesByRequestId(id: $requestId) {
                            data_request_id
                            account_id
                            id
                            outcome
                            round
                            total_stake
                        }
                    }
                `,
            variables: {
                requestId,
            }
        });

        const userStakes = transformToUserStakes(response.data.stakes);
        return userStakes;
    } catch(error) {
        console.error('[getUserStakesByRequestId]', error);
        return {};
    }
}

export interface UserStakesForAccountFilters {
    limit: number;
    offset: number;
}

export async function getUserStakesByAccountId(accountId: string, filters: UserStakesForAccountFilters): Promise<Pagination<OutcomeStake>> {
    try {
        const response = await graphqlClient.query({
            query: gql`
                    query GetUserStakesAccount($accountId: String!, $limit: Int, $offset: Int) {
                        stakes: getUserStakes(accountId: $accountId, limit: $limit, offset: $offset) {
                            items {
                                data_request_id
                                account_id
                                id
                                outcome
                                round
                                total_stake
                                data_request {
                                    finalized_outcome
                                }
                            }
                            total
                        }
                    }
                `,
            variables: {
                accountId,
                limit: filters.limit,
                offset: filters.offset,
            }
        });

        const items = transformToUserStakes(response.data.stakes.items);

        return {
            items: items[accountId],
            total: response.data.stakes.total,
        }
    } catch (error) {
        console.error('[getUserStakesByAccountId]', error);
        return {
            items: [],
            total: 0,
        };
    }
}


export async function getUnclaimedStakesByAccountId(accountId: string): Promise<OutcomeStake[]> {
    try {
        const response = await graphqlClient.query({
            query: gql`
                    query GetUnclaimedStakesAccount($accountId: String!) {
                        stakes: getUnclaimedStakes(accountId: $accountId) {
                            data_request_id
                            account_id
                            id
                            outcome
                            round
                            total_stake
                            data_request {
                                finalized_outcome
                            }
                        }
                    }
                `,
            variables: {
                accountId,
            }
        });

        const items = transformToUserStakes(response.data.stakes);
        return combineOutcomeStakes(items[accountId]);
    } catch (error) {
        console.error('[getUnclaimedStakesByAccountId]', error);
        return [];
    }
}
