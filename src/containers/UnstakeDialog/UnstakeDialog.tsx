import Big from 'big.js';
import React, { useState } from 'react';
import Select from '../../components/Select';
import Dialog from '../../compositions/Dialog';
import NumberInput from '../../compositions/NumberInput';
import { DataRequestViewModel } from '../../models/DataRequest';
import { transfromOutcomeToString } from '../../models/DataRequestOutcome';
import trans from '../../translation/trans';
import { formatToken, toToken } from '../../utils/tokenUtils';
import { UnstakeFormValues, createDefaultUnstakeFormValues } from './services/createDefaultUnstakeFormValues';
import validateUnstakeFormValues from './services/validateUnstakeFormValues';

import s from './UnstakeDialog.module.scss';

interface Props {
    onRequestClose: () => void;
    onSubmit: (formValues: UnstakeFormValues) => void;
    open: boolean;
    dataRequest: DataRequestViewModel;
}


export default function UnstakeDialog({
    dataRequest,
    onRequestClose,
    onSubmit,
    open,
}: Props) {
    const [formValues, setFormValues] = useState(createDefaultUnstakeFormValues());
    const unbondedStakes = dataRequest.loggedInAccountStakes.filter(stake => !stake.bonded && new Big(stake.totalStake).gt(0));

    function handleStakeChange(amount: string) {
        setFormValues({
            ...formValues,
            amount: amount ? toToken(amount, dataRequest.stakeToken.decimals) : '0',
            amountFormatted: amount ? amount : '',
        });
    }

    function handleMaxClick() {
        const selectedOutcomeStake = unbondedStakes[formValues.stakeIndex];

        setFormValues({
            ...formValues,
            amount: selectedOutcomeStake.totalStake,
            amountFormatted: formatToken(selectedOutcomeStake.totalStake, dataRequest.stakeToken.decimals),
        });
    }

    function handleOutcomeChange(outcomeIndex: string) {
        setFormValues({
            ...formValues,
            stakeIndex: Number(outcomeIndex),
            selectedStakedOutcome: unbondedStakes[Number(outcomeIndex)],
        });
    }

    const errors = validateUnstakeFormValues(formValues, unbondedStakes);

    return (
        <Dialog
            open={open}
            onRequestClose={onRequestClose}
            onSubmitClick={() => onSubmit({
                ...formValues,
                selectedStakedOutcome: unbondedStakes[formValues.stakeIndex],
            })}
            title={trans('unstakeDialog.title')}
            canSubmit={errors.canSubmit}
        >
            <form>
                <div className={s.formItem}>
                    <Select
                        id="unstake_dialog_outcome"
                        value={formValues.stakeIndex.toString()}
                        label={trans('unstakeDialog.label.answer')}
                        onChange={handleOutcomeChange}
                        items={unbondedStakes.map((stake, index) => ({
                            name: `Round ${stake.round} - ${transfromOutcomeToString(stake.outcome)}`,
                            value: index.toString(),
                        }))}
                    />
                </div>
                <div className={s.formItem}>
                    {trans('unstakeDialog.label.staked', {
                        stake: formatToken(unbondedStakes[formValues.stakeIndex].totalStake, dataRequest.stakeToken.decimals),
                        tokenSymbol: dataRequest.stakeToken.symbol,
                    })}
                </div>
                <div className={s.formItem}>
                    <NumberInput
                        label={trans('unstakeDialog.label.stakeAmount', { tokenSymbol: dataRequest.stakeToken.symbol })}
                        className={s.formInput}
                        value={formValues.amountFormatted}
                        onChange={handleStakeChange}
                        onMaxClick={handleMaxClick}
                        showMax
                        error={errors.amount}
                    />
                </div>
            </form>
        </Dialog>
    );
}
