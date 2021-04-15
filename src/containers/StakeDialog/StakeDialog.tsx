import React, { useState } from 'react';
import Input from '../../components/Input';
import OptionSwitch from '../../components/OptionSwitch/OptionSwitch';
import Select from '../../components/Select';
import Dialog from '../../compositions/Dialog';
import { Account } from '../../models/Account';
import { DataRequestViewModel } from '../../models/DataRequest';
import trans from '../../translation/trans';
import { toToken } from '../../utils/tokenUtils';
import createDefaultStakeFormValues, { StakeFormValues } from './services/createDefaultStakeFormValues';
import validateStakeFormValues from './services/validateStakeFormValues';

import s from './StakeDialog.module.scss';

interface Props {
    onRequestClose: () => void;
    onSubmit: (formValues: StakeFormValues) => void;
    open: boolean;
    account: Account;
    dataRequest: DataRequestViewModel;
}

export default function StakeDialog({
    onRequestClose,
    onSubmit,
    open,
    account,
    dataRequest,
}: Props) {
    const [formValues, setFormValues] = useState(createDefaultStakeFormValues(dataRequest));

    function handleValidityChange(isInvalid: boolean) {
        setFormValues({
            ...formValues,
            isInvalid,
        });
    }

    function handleAnswerChange(answer: string) {
        setFormValues({
            ...formValues,
            answer,
        });
    }

    function handleStakeChange(amount: string) {
        setFormValues({
            ...formValues,
            amount: amount ? toToken(amount) : '0',
            amountFormatted: amount ? amount : '0',
        });
    }

    const errors = validateStakeFormValues(formValues, account, dataRequest);

    return (
        <Dialog
            open={open}
            onRequestClose={onRequestClose}
            onSubmitClick={() => onSubmit(formValues)}
            title={trans('stakeDialog.title')}
            canSubmit={errors.canSubmit}
        >
            <form className={s.form}>
                <div className={s.formItem}>
                    <OptionSwitch
                        label={trans('stakeDialog.label.validity')}
                        labelA={trans('stakeDialog.label.valid')}
                        labelB={trans('stakeDialog.label.invalid')}
                        className={s.formInput}
                        value={formValues.isInvalid}
                        onChange={handleValidityChange}
                    />
                </div>

                {!formValues.isInvalid && dataRequest.outcomes && (
                    <div className={s.formItem}>
                        <Select
                            id="stake_dialog_outcome"
                            value={formValues.answer}
                            label={trans('stakeDialog.label.answer')}
                            onChange={handleAnswerChange}
                            items={dataRequest.outcomes.map(outcome => ({
                                name: outcome,
                                value: outcome,
                            }))}
                        />
                    </div>
                )}

                {!formValues.isInvalid && !dataRequest.outcomes && (
                    <div className={s.formItem}>
                        <Input
                            label={trans('stakeDialog.label.answer')}
                            className={s.formInput}
                            value={formValues.answer}
                            error={errors.answer}
                            onChange={handleAnswerChange}
                        />
                    </div>
                )}
                <div className={s.formItem}>
                    <Input
                        label={trans('stakeDialog.label.stakeAmount')}
                        className={s.formInput}
                        value={formValues.amountFormatted}
                        onChange={handleStakeChange}
                        type="number"
                        error={errors.amount}
                    />
                </div>
                {errors.message && (<div className={s.error}>{errors.message}</div>)}
            </form>
        </Dialog>
    );
}
