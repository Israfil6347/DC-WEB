import { useState } from 'react';

export interface DepositRequestState {
  SearchAccount: string;
  CardNo: string;
  CardAccount: string;
  CardPIN: string;
  DepositDate: any;
  DepositLaterDate: string;
  RepeatMonths: number;
  BankName: string;
  BankAccountNumber: string;
  BankRoutingNumber: string;
  TransactionNumber: string;
  TransactionReceipt: string;
  SentAmount: number;
  AccountTypeName: string;
  Balance: number;
  WithdrawableBalance: number;
  Remarks?: string;
  Errors: {
    SearchAccount: string;
    CardNo: string;
    CardAccount: string;
    CardPIN: string;
    DepositDate: string;
    DepositLaterDate: string;
    RepeatMonths: string;
    BankName: string;
    BankAccountNumber: string;
    BankRoutingNumber: string;
    TransactionNumber: string;
    TransactionReceipt: string;
    SentAmount: string;
    AccountTypeName: string;
    Balance: string;
    WithdrawableBalance: string;
    Remarks?: string;
  };
}

function useDepositRequestState(
  requestFieldValidator: (fieldName: string, fieldValue: any) => void
) {
  const initialDepositRequestState: DepositRequestState = {
    SearchAccount: '',
    CardNo: '',
    CardAccount: '',
    CardPIN: '',
    DepositDate: '',
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
    },
  };

  const [depositRequestState, setDepositRequestState] = useState(
    initialDepositRequestState
  );

  const updateDepositRequestState = (fieldName: string, fieldValue: any) => {
    setDepositRequestState((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
      Errors: {
        ...prevState.Errors,
        [fieldName]: requestFieldValidator(fieldName, fieldValue),
      },
    }));
  };

  const clearDepositRequestState = () => {
    setDepositRequestState(initialDepositRequestState);
  };

  return {
    depositRequestState,
    updateDepositRequestState,
    clearDepositRequestState,
  };
}

export default useDepositRequestState;
