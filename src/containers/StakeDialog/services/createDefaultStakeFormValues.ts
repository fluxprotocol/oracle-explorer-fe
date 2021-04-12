import { DataRequestViewModel } from "../../../models/DataRequest";

export interface StakeFormValues {
    amount: string;
    amountFormatted: string;
    isInvalid: boolean;
    answer: string;
}

export default function createDefaultStakeFormValues(dataRequest: DataRequestViewModel): StakeFormValues {
    return {
        amount: '0',
        amountFormatted: '0',
        isInvalid: false,
        answer: dataRequest.outcomes ? dataRequest.outcomes[0] : '',
    };
}
