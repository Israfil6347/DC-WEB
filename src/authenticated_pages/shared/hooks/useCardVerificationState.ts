import { useState } from 'react';
import { validateCardVerificationState } from '../validations/validateCardVerificationState';

export interface CardVerificationState {
  CardPIN: '';
  CardNo: '';
  CardAccount: '';
  AccountTypeName: '';
  Errors: {
    CardPIN: '';
    CardNo: '';
    CardAccount: '';
    AccountTypeName: '';
  };
}

export function useCardVerificationState() {
  const [cardVerificationState, setCardVerificationState] =
    useState<CardVerificationState>({
      CardPIN: '',
      CardNo: '',
      CardAccount: '',
      AccountTypeName: '',
      Errors: {
        CardPIN: '',
        CardNo: '',
        CardAccount: '',
        AccountTypeName: '',
      },
    });

  const updateCardVerificationState = (fieldName: string, fieldValue: any) => {
    setCardVerificationState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: validateCardVerificationState(fieldName, fieldValue),
        },
      };
    });
  };

  return {
    cardVerificationState,
    updateCardVerificationState,
  };
}
