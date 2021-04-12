import gql from "graphql-tag";
import { transformToUserStakes, UserStakes } from "../models/UserStakes";
import { graphqlClient } from "./GraphQLService";

export async function getUserStakesByRequestId(requestId: string, accountId?: string): Promise<UserStakes> {
    try {
        const response = await graphqlClient.query({
            query: gql`
                    query GetUserStakes($requestId: String!, $accountId: String) {
                        stakes: getUserStakesByRequestId(id: $requestId, accountId: $accountId) {
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
                accountId,
            }
        });

        const userStakes = transformToUserStakes(response.data.stakes);
        return userStakes;
    } catch(error) {
        console.error('[getUserStakesByRequestId]', error);
        return {};
    }
}
