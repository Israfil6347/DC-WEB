import { DepositRequestState } from 'authenticated_pages/deposits/shared/hooks/useDepositRequestState';
import { useState } from 'react';
import { validateDepositThroughBankRequestState } from '../validation/validateDepositThroughBankRequestState';

function useDepositThroughBankRequestState() {
  const initialDepositThroughBankRequestState: DepositRequestState = {
    SearchAccount: '',
    CardNo: '',
    CardAccount: '',
    CardPIN: '',
    DepositDate: new Date(),
    DepositLaterDate: '',
    RepeatMonths: 0,
    BankName: '',
    BankAccountNumber: '',
    BankRoutingNumber: '',
    TransactionNumber: '',
    TransactionReceipt: '',
    SentAmount: 0,
    AccountTypeName: '',
    Balance: 0,
    WithdrawableBalance: 0,
    Remarks: '',
    Errors: {
      SearchAccount: '',
      CardNo: '',
      CardAccount: '',
      CardPIN: '',
      DepositDate: '',
      DepositLaterDate: '',
      RepeatMonths: '',
      BankName: '',
      BankAccountNumber: '',
      BankRoutingNumber: '',
      TransactionNumber: '',
      TransactionReceipt: '',
      SentAmount: '',
      AccountTypeName: '',
      Balance: '',
      WithdrawableBalance: '',
      Remarks: '',
    },
  };

  const [depositThroughBankRequestState, setDepositThroughBankRequestState] =
    useState<DepositRequestState>(initialDepositThroughBankRequestState);

  const updateDepositThroughBankRequestState = (
    fieldName: string,
    fieldValue: any,
    Amount?: any
  ) => {
    setDepositThroughBankRequestState((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
      Errors: {
        ...prevState.Errors,
        [fieldName]: validateDepositThroughBankRequestState(
          fieldName,
          fieldValue,
          Amount
        ),
      },
    }));
  };

  const clearDepositThroughBankRequestState = () => {
    setDepositThroughBankRequestState(initialDepositThroughBankRequestState);
  };

  return {
    depositThroughBankRequestState,
    updateDepositThroughBankRequestState,
    clearDepositThroughBankRequestState,
  };
}

export default useDepositThroughBankRequestState;
