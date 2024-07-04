import { useState } from 'react';
import { validateGenerateOneTimeQRState } from '../validation/validateGenerateOneTimeQRState';

export interface GenerateOneTimeQRState {
  Amount: string;
  AccountNumber: string;
  AccountTypeName: string;
  Balance: number;
  CardAccount: string;
  WithdrawableBalance: number;
  CardNo: string;
  CardPIN: string;
  Errors: {
    Amount: string;
    AccountNumber: string;
    AccountTypeName: string;
    CardAccount: string;
    Balance: string;
    WithdrawableBalance: string;
    CardNo: string;
    CardPIN: string;
  };
}

function useGenerateOneTimeQRState() {
  const [generateOneTimeQRState, setGenerateOneTimeQRState] =
    useState<GenerateOneTimeQRState>({
      Amount: '',
      AccountTypeName: '',
      Balance: 0,
      AccountNumber: '',
      CardAccount: '',
      WithdrawableBalance: 0,
      CardNo: '',
      CardPIN: '',
      Errors: {
        Amount: '',
        AccountNumber: '',
        CardAccount: '',
        AccountTypeName: '',
        Balance: '',
        WithdrawableBalance: '',
        CardNo: '',
        CardPIN: '',
      },
    });
  const updateGenerateOneTimeQRState = (fieldName: string, fieldValue: any) => {
    setGenerateOneTimeQRState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: validateGenerateOneTimeQRState(
            fieldName,
            fieldValue,
            generateOneTimeQRState.WithdrawableBalance
          ),
        },
      };
    });
  };
  return { generateOneTimeQRState, updateGenerateOneTimeQRState };
}

export default useGenerateOneTimeQRState;
