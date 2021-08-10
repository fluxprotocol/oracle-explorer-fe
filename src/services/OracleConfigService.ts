import gql from "graphql-tag";
import { OracleConfig, transformToOracleConfig } from "../models/OracleConfig";
import { graphqlClient } from "./GraphQLService";

export async function getOracleConfigById(id: string): Promise<OracleConfig | undefined> {
    try {
        const response = await graphqlClient.query({
            query: gql`
                query GetOracleConfig($id: String!) {
                    config: getOracleConfig(id: $id) {
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
                        fee {
                            flux_market_cap
                            resolution_fee_percentage
                            total_value_staked
                        }
                    }
                }
            `,
            variables: {
                id,
            }
        });

        return transformToOracleConfig(response.data.config);
    } catch (error) {
        console.error('[getOracleConfig]', error);
        return undefined;
    }
}
