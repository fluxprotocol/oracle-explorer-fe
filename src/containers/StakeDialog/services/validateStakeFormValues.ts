import Big from 'big.js';
import { Account } from '../../../models/Account';
import { DataRequestViewModel } from '../../../models/DataRequest';
import trans from '../../../translation/trans';
import { StakeFormValues } from './createDefaultStakeFormValues';

interface StakeFormErrors {
    amount: string;
    answer: string;
    canSubmit: boolean;
}

export default function validateStakeFormValues(formValues: StakeFormValues, account: Account, dataRequest: DataRequestViewModel): StakeFormErrors {
    const errors: StakeFormErrors = {
        amount: '',
        answer: '',
        canSubmit: true,
    };

    const accountBalance = new Big(account.balance);

    if (!formValues.isInvalid) {
        if (!formValues.answer) {
            errors.canSubmit = false;
        }

        if (dataRequest.outcomes && dataRequest.outcomes.length) {
            if (!dataRequest.outcomes.includes(formValues.answer)) {
                errors.answer = trans('stakeDialog.errors.mustBeAnOutcome');
                errors.canSubmit = false;
            }
        }
    }

    if (accountBalance.lt(formValues.amount)) {
        errors.amount = trans('stakeDialog.errors.notEnoughBalance')
        errors.canSubmit = false;
    }

    if (new Big(formValues.amount).lte(0)) {
        errors.canSubmit = false;
    }


    return errors;
}
