import { Outcome, OutcomeType } from "../../../models/DataRequestOutcome";

export interface UnstakeFormValues {
    outcome: Outcome;
    outcomeIndex: number;
    amount: string;
    amountFormatted: string;
}

export function createDefaultUnstakeFormValues(): UnstakeFormValues {
    return {
        outcome: {
            type: OutcomeType.Invalid,
        },
        amount: '',
        amountFormatted: '',
        outcomeIndex: 0,
    };
}
