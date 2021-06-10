import React, { useCallback, useState } from 'react';
import Dialog from '../../compositions/Dialog';
import { Account } from '../../models/Account';
import trans from '../../translation/trans';
import createDefaultStorageManagerFormValues, { StorageManagerFormValues } from './services/createDefaultStorageManagerFormValues';
import validateStorageManagerFormValues from './services/validateStorageManagerFormValues';
import { formatToken, toToken } from '../../utils/tokenUtils';

import s from './StorageManagerDialog.module.scss';
import NumberInput from '../../compositions/NumberInput';
import { AppConfig } from '../../models/AppConfig';
import Big from 'big.js';

interface Props {
    open: boolean;
    account: Account;
    appConfig: AppConfig;
    onRequestClose: () => void;
    onSubmit: (formValues: StorageManagerFormValues) => void;
}

export default function StorageManagerDialog({
    open,
    account,
    appConfig,
    onRequestClose,
    onSubmit,
}: Props) {
    const [formValues, setFormValues] = useState(createDefaultStorageManagerFormValues());

    const errors = validateStorageManagerFormValues(formValues, account);

    function handleAmountChange(amount: string) {
        if (amount && new Big(amount).lt(0)) {
            return;
        }

        setFormValues({
            amount: amount ? toToken(amount, appConfig.nativeTokenDecimals) : '0',
            amountFormatted: amount ? amount : '',
        });
    }

    const handleMaxClick = useCallback(() => {
        setFormValues({
            amount: account.storageAvailable,
            amountFormatted: formatToken(account.storageAvailable, appConfig.nativeTokenDecimals, 4),
        });
    }, [account, appConfig]);

    return (
        <Dialog
           open={open}
           onRequestClose={onRequestClose}
           title={trans('storageManagerDialog.title')}
           onSubmitClick={() => onSubmit(formValues)}
           canSubmit={errors.canSubmit}
        >
            <form>
                <p>
                    {trans('storageManagerDialog.description', { nativeToken: appConfig.nativeTokenSymbol })}
                </p>
                <p>
                    {trans('storageManagerDialog.label.amountAvailable', {
                        amount: formatToken(account.storageAvailable, appConfig.nativeTokenDecimals, 4),
                        nativeToken: appConfig.nativeTokenSymbol,
                    })}
                </p>
                <div className={s.formItem}>
                    <NumberInput
                        label={trans('storageManagerDialog.label.withdrawAmount', { nativeToken: appConfig.nativeTokenSymbol })}
                        className={s.formInput}
                        value={formValues.amountFormatted}
                        onChange={handleAmountChange}
                        type="number"
                        error={errors.amount}
                        showMax
                        onMaxClick={handleMaxClick}
                    />
                </div>
            </form>
        </Dialog>
    );
}
