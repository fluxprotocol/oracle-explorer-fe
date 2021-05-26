import gql from "graphql-tag";
import { DataRequestListItem, transformToDataRequestListItem, transformToDataRequestViewModel } from "../models/DataRequest";
import { Pagination } from "../models/Pagination";
import { graphqlClient } from "./GraphQLService";
export interface DataRequestFilters {
    onlyArbitratorRequests: boolean;
}

interface DataRequestPagination {
    limit: number;
    offset: number;
}

export async function getAllDataRequests({
    limit,
    offset,
}: DataRequestPagination, {
    onlyArbitratorRequests,
}: DataRequestFilters): Promise<Pagination<DataRequestListItem>> {
    try {
        const response = await graphqlClient.query({
            fetchPolicy: 'network-only',
            query: gql`
                query GetAllDataRequests($limit: Int, $offset: Int, $onlyArbitratorRequests: Boolean) {
                    dataRequests: getDataRequests(limit: $limit, offset: $offset, onlyArbitratorRequests: $onlyArbitratorRequests) {
                        total
                        items {
                            id
                            date
                            requestor
                            finalized_outcome
                            sources {
                                end_point
                                source_path
                            }
                        }
                    }
                }
            `,
            variables: {
                limit,
                offset,
                onlyArbitratorRequests,
            }
        });

        const paginatedDataRequests = response.data.dataRequests.items.map((dr: any) => transformToDataRequestListItem(dr));

        return {
            total: response.data.dataRequests.total,
            items: paginatedDataRequests,
        };
    } catch (error) {
        console.error('[getAllDataRequests]', error);

        return {
            total: 0,
            items: [],
        };
    }
}

export async function getDataRequestById(id: string) {
    try {
        const response = await graphqlClient.query({
            fetchPolicy: 'network-only',
            query: gql`
                query GetDataRequest($id: String!) {
                    dataRequest: getDataRequest(id: $id) {
                        block_height
                        date
                        final_arbitrator_triggered
                        global_config_id
                        id
                        initial_challenge_period
                        outcomes
                        requestor
                        target_contract
                        finalized_outcome
                        description
                        settlement_time
                        tags
                        sources {
                            end_point
                            source_path
                        }
                        config {
                            block_height
                            bond_token
                            date
                            default_challenge_window_duration
                            final_arbitrator
                            final_arbitrator_invoke_amount
                            gov
                            id
                            max_outcomes
                            min_initial_challenge_window_duration
                            resolution_fee_percentage
                            stake_token
                            validity_bond
                        }
                        resolution_windows {
                            block_height
                            bond_size
                            bonded_outcome
                            date
                            dr_id
                            end_time
                            id
                            outcome_stakes {
                                data_request_id
                                id
                                round
                                total_stake
                                outcome
                            }
                            round
                            user_stakes {
                                account_id
                                data_request_id
                                id
                                outcome
                                round
                                total_stake
                            }
                        }
                    }
                }
            `,
            variables: {
                id
            }
        });

        return transformToDataRequestViewModel(response.data.dataRequest);
    } catch(error) {
        console.error('[getDataRequestById]', error);
        return null;
    }
}

export async function doesDataRequestExists(id: string): Promise<boolean> {
    try {
        const response = await graphqlClient.query({
            query: gql`
                query DataRequestExists($id: String!) {
                    request: getDataRequest(id: $id) {
                        id
                    }
                }
            `,
            variables: {
                id,
            }
        });

        if (!response.data.request || !response.data.request.id) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('[doesDataRequestExists]', error);
        return false;
    }
}

