import Big from 'big.js';
import { Account } from '../../../models/Account';
import { DataRequestViewModel } from '../../../models/DataRequest';
import { OutcomeType } from '../../../models/DataRequestOutcome';
import trans from '../../../translation/trans';
import { StakeFormValues } from './createDefaultStakeFormValues';

interface StakeFormErrors {
    amount: string;
    answer: string;
    message: string;
    canSubmit: boolean;
}

export default function validateStakeFormValues(formValues: StakeFormValues, account: Account, dataRequest: DataRequestViewModel): StakeFormErrors {
    const errors: StakeFormErrors = {
        amount: '',
        answer: '',
        message: '',
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

    // You cannot stake on the same bonded outcome as the previous outcome
    const currentRound = dataRequest.resolutionWindows[dataRequest.resolutionWindows.length - 1];
    if (currentRound?.round !== 0) {
        const previousRound = dataRequest.resolutionWindows[dataRequest.resolutionWindows.length - 2];

        if (previousRound.bondedOutcome?.type === OutcomeType.Invalid && formValues.isInvalid) {
            errors.canSubmit = false;
            errors.message = trans('stakeDialog.errors.sameAnswerAsPreviousRound');
        }

        if (previousRound.bondedOutcome?.type === OutcomeType.Answer && previousRound.bondedOutcome.answer === formValues.answer) {
            errors.canSubmit = false;
            errors.message = trans('stakeDialog.errors.sameAnswerAsPreviousRound');
        }
    }

    return errors;
}
