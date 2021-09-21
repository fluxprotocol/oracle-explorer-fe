import gql from "graphql-tag";
import { AccountInfo } from "../models/Account";
import { transformToWhitelistItemViewModel } from "../models/WhitelistItem";
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
                            has_requests
                            has_stakes
                            whitelist_item {
                                active
                                code_base_url
                                custom_fee
                                interface_name
                            }
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
            whitelistItem: data.whitelist_item ? transformToWhitelistItemViewModel(data.whitelist_item) : undefined,
            hasRequests: data.has_requests,
            hasStakes: data.has_stakes,
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
            hasStakes: false,
            hasRequests: false,
        }
    }
}
