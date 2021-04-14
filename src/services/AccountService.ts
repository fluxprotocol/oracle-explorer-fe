import gql from "graphql-tag";
import { AccountInfo } from "../models/Account";
import { graphqlClient } from "./GraphQLService";

export async function getAccountInfo(accountId: string): Promise<AccountInfo> {
    try {
        const response = await graphqlClient.query({
            query: gql`
                    query AccountInfo($accountId: String!) {
                        accountInfo: getAccountInfo(accountId: $accountId) {
                            active_staking
                            total_staked
                            total_claimed
                        }
                    }
                `,
            variables: {
                accountId,
            }
        });

        const data = response.data.accountInfo;

        return {
            activeStaking: data.active_staking,
            totalStaked: data.total_staked,
            totalClaimed: data.total_claimed,
        }
    } catch (error) {
        console.error('[getAccountInfo]', error);

        return {
            activeStaking: '0',
            totalStaked: '0',
            totalClaimed: '0',
        }
    }
}
