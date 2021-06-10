import gql from "graphql-tag";
import { AccountInfo } from "../models/Account";
import { graphqlClient } from "./GraphQLService";
import { getProviderStorageBalance } from "./providers/ProviderRegistry";

export async function getAccountInfo(accountId: string, providerId: string = 'near'): Promise<AccountInfo> {
    try {
        const storageBalanceRequest = getProviderStorageBalance(providerId, accountId);
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
        const storageBalance = await storageBalanceRequest;

        return {
            activeStaking: data.active_staking,
            totalStaked: data.total_staked,
            totalClaimed: data.total_claimed,
            storageAvailable: storageBalance.available,
            storageTotal: storageBalance.total,
            storageUsed: storageBalance.used,
        }
    } catch (error) {
        console.error('[getAccountInfo]', error);

        return {
            activeStaking: '0',
            totalStaked: '0',
            totalClaimed: '0',
            storageAvailable: '0',
            storageTotal: '0',
            storageUsed: '0',
        }
    }
}
