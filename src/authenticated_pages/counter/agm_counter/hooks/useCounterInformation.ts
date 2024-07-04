import { useState } from 'react';
import { validateCounterInformationState } from '../validation/validateCounterInformationState';

export interface CounterInformation {
  AccountNo: string;
  Errors: {
    AccountNo: string;
  };
}

function useCounterInformation() {
  const [CounterInformationState, setCounterNo] = useState<CounterInformation>({
    AccountNo: '',
    Errors: {
      AccountNo: '',
    },
  });
  const updateCounterInformationState = (
    fieldName: string,
    fieldValue: any
  ) => {
    setCounterNo((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: validateCounterInformationState(fieldName, fieldValue),
        },
      };
    });
  };
  return { CounterInformationState, updateCounterInformationState };
}

export default useCounterInformation;
