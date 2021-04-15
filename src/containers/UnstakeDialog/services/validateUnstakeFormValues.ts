import Big from "big.js";
import { OutcomeStake } from "../../../models/OutcomeStake";
import trans from "../../../translation/trans";
import { UnstakeFormValues } from "./createDefaultUnstakeFormValues";

interface UnstakeFormErrors {
    canSubmit: boolean;
    amount: string;
}

export default function validateUnstakeFormValues(formValues: UnstakeFormValues, roundStakes: OutcomeStake[]): UnstakeFormErrors {
    const errors: UnstakeFormErrors = {
        canSubmit: true,
        amount: '',
    };

    const roundStake = roundStakes[formValues.outcomeIndex];

    if (formValues.amount) {
        const amount = new Big(formValues.amount);

        if (amount.lte(0)) {
            errors.canSubmit = false;
        }

        if (amount.gt(roundStake.stake)) {
            errors.canSubmit = false;
            errors.amount = trans('unstakeDialog.errors.notEnoughStaked');
        }
    } else {
        errors.canSubmit = false;
    }

    return errors;
}
