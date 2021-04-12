import gql from "graphql-tag";
import { DataRequestListItem, transformToDataRequestListItem, transformToDataRequestViewModel } from "../models/DataRequest";
import { Pagination } from "../models/Pagination";
import { graphqlClient } from "./GraphQLService";

interface DataRequestFilters {
    limit: number;
    offset: number;
}

export async function getAllDataRequests({
    limit,
    offset,
}: DataRequestFilters): Promise<Pagination<DataRequestListItem>> {
    try {
        const response = await graphqlClient.query({
            query: gql`
                query GetAllDataRequests($limit: Int, $offset: Int) {
                    dataRequests: getDataRequests(limit: $limit, offset: $offset) {
                        total
                        items {
                            id
                            date
                            requestor
                            finalized_outcome
                        }
                    }
                }
            `,
            variables: {
                limit,
                offset,
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
