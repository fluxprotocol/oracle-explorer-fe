import { parseJson } from "../utils/jsonUtils"

interface FixedCustomFee {
    fee: string;
    type: 'fixed';
}

interface MultiplierCustomFee {
    multiplier: number;
    type: 'multiplier';
}

interface MultiplierCustomFeeGraphData {
    Multiplier: number;
}

interface FixedCustomFeeGraphData {
    Fixed: string;
}

export interface WhitelistItemGraphData {
    interface_name: string;
    account_id: string;
    custom_fee: string;
    code_base_url: string;
    active: boolean;
}

export interface WhitelistItemViewModel {
    interfaceName: string;
    accountId: string;
    codeBaseUrl: string;
    active: boolean;
    customFee?: FixedCustomFee | MultiplierCustomFee;
}

export function transformToWhitelistItemViewModel(data: WhitelistItemGraphData): WhitelistItemViewModel {
    const parsedCustomFee = parseJson<FixedCustomFeeGraphData | MultiplierCustomFeeGraphData>(data.custom_fee);
    let customFee: WhitelistItemViewModel['customFee'];

    if (parsedCustomFee) {
        if ('Fixed' in parsedCustomFee) {
            customFee = {
                fee: parsedCustomFee.Fixed,
                type: 'fixed',
            }
        } else {
            customFee = {
                multiplier: parsedCustomFee.Multiplier,
                type: 'multiplier',
            }
        }
    }

    return {
        active: data.active,
        codeBaseUrl: data.code_base_url,
        accountId: data.account_id,
        customFee,
        interfaceName: data.interface_name,
    }
}
