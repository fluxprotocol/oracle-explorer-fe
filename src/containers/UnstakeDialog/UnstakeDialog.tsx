import React, { useState } from 'react';
import Select from '../../components/Select';
import Dialog from '../../compositions/Dialog';
import NumberInput from '../../compositions/NumberInput';
import { DataRequestViewModel } from '../../models/DataRequest';
import { transfromOutcomeToString } from '../../models/DataRequestOutcome';
import { OutcomeStake } from '../../models/OutcomeStake';
import { ResolutionWindow } from '../../models/ResolutionWindow';
import trans from '../../translation/trans';
import { formatToken, toToken } from '../../utils/tokenUtils';
import { UnstakeFormValues, createDefaultUnstakeFormValues } from './services/createDefaultUnstakeFormValues';
import validateUnstakeFormValues from './services/validateUnstakeFormValues';

import s from './UnstakeDialog.module.scss';

interface Props {
    onRequestClose: () => void;
    onSubmit: (formValues: UnstakeFormValues) => void;
    open: boolean;
    accountStakes: OutcomeStake[];
    dataRequest: DataRequestViewModel;
}


export default function UnstakeDialog({
    accountStakes,
    dataRequest,
    onRequestClose,
    onSubmit,
    open,
}: Props) {
    const currentResolutionWindow: ResolutionWindow | undefined = dataRequest.resolutionWindows[dataRequest.resolutionWindows.length - 1] ?? undefined;
    const roundStakes = accountStakes.filter(stake => stake.round === currentResolutionWindow.round);

    const [formValues, setFormValues] = useState(createDefaultUnstakeFormValues());

    function handleStakeChange(amount: string) {
        setFormValues({
            ...formValues,
            amount: amount ? toToken(amount) : '0',
            amountFormatted: amount ? amount : '',
        });
    }

    function handleMaxClick() {
        const selectedOutcomeStake = roundStakes[formValues.outcomeIndex];

        setFormValues({
            ...formValues,
            amount: selectedOutcomeStake.stake,
            amountFormatted: formatToken(selectedOutcomeStake.stake),
        });
    }

    function handleOutcomeChange(outcomeIndex: string) {
        setFormValues({
            ...formValues,
            outcomeIndex: Number(outcomeIndex),
        });
    }

    const errors = validateUnstakeFormValues(formValues, roundStakes);

    return (
        <Dialog
            open={open}
            onRequestClose={onRequestClose}
            onSubmitClick={() => onSubmit({
                ...formValues,
                outcome: roundStakes[formValues.outcomeIndex].outcome,
            })}
            title={trans('unstakeDialog.title')}
            canSubmit={errors.canSubmit}
        >
            <form>
                <div className={s.formItem}>
                    <Select
                        id="unstake_dialog_outcome"
                        value={formValues.outcomeIndex.toString()}
                        label={trans('unstakeDialog.label.answer')}
                        onChange={handleOutcomeChange}
                        items={roundStakes.map((stake, index) => ({
                            name: transfromOutcomeToString(stake.outcome),
                            value: index.toString(),
                        }))}
                    />
                </div>
                <div className={s.formItem}>
                    {trans('unstakeDialog.label.staked', {
                        stake: formatToken(roundStakes[formValues.outcomeIndex].stake),
                        tokenSymbol: trans('global.token.symbol'),
                    })}
                </div>
                <div className={s.formItem}>
                    <NumberInput
                        label={trans('unstakeDialog.label.stakeAmount', { tokenSymbol: trans('global.token.symbol') })}
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
