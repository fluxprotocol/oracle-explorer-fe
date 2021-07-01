import Big from "big.js";
import { UserStakeViewModel } from "../../../models/UserStakes";
import trans from "../../../translation/trans";
import { UnstakeFormValues } from "./createDefaultUnstakeFormValues";

interface UnstakeFormErrors {
    canSubmit: boolean;
    amount: string;
}

export default function validateUnstakeFormValues(formValues: UnstakeFormValues, unbondedStakes: UserStakeViewModel[]): UnstakeFormErrors {
    const errors: UnstakeFormErrors = {
        canSubmit: true,
        amount: '',
    };

    const selectedStakedOutcome = unbondedStakes[formValues.stakeIndex];

    if (!selectedStakedOutcome) {
        errors.canSubmit = false;
        return errors;
    }

    if (formValues.amount) {
        const amount = new Big(formValues.amount);

        if (amount.lte(0)) {
            errors.canSubmit = false;
        }

        if (amount.gt(selectedStakedOutcome.totalStake)) {
            errors.canSubmit = false;
            errors.amount = trans('unstakeDialog.errors.notEnoughStaked');
        }
    } else {
        errors.canSubmit = false;
    }

    return errors;
}
