import { UserStakeViewModel } from "../../../models/UserStakes";

export interface UnstakeFormValues {
    selectedStakedOutcome?: UserStakeViewModel;
    stakeIndex: number;
    amount: string;
    amountFormatted: string;
}

export function createDefaultUnstakeFormValues(): UnstakeFormValues {
    return {
        selectedStakedOutcome: undefined,
        amount: '',
        amountFormatted: '',
        stakeIndex: 0,
    };
}
