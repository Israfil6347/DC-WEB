import { useState } from 'react';
import { validateWoooApplicationRequestState } from '../validation/validateWoooApplicationRequestState';

export interface WoooApplicationRequestState {
  WoooTypeCode: '';
  FromDate: '';
  ToDate: '';
  FromTime: '';
  ToTime: '';
  RejoiningDate: '';
  Reason: '';
  IsHourly: true;
  BackDateDays: '';
  Errors: {
    WoooTypeCode: '';
    RejoiningDate: '';
    FromTime: '';
    ToTime: '';
    Reason: '';
    FromDate: '';
    ToDate: '';
    IsHourly: '';
    BackDateDays: '';
  };
}

const useWoooApplicationRequestStates = () => {
  const [woooApplicationRequestStates, setWoooApplicationRequestStates] =
    useState<WoooApplicationRequestState>({
      WoooTypeCode: '',
      FromDate: '',
      ToDate: '',
      FromTime: '',
      ToTime: '',
      RejoiningDate: '',
      Reason: '',
      IsHourly: true,
      BackDateDays: '',
      Errors: {
        WoooTypeCode: '',
        RejoiningDate: '',
        FromTime: '',
        ToTime: '',
        Reason: '',
        FromDate: '',
        ToDate: '',
        IsHourly: '',
        BackDateDays: '',
      },
    });

  const updateWoooApplicationRequestState = (
    fieldName: string,
    fieldValue: any
  ) => {
    setWoooApplicationRequestStates((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState?.Errors,
          [fieldName]: validateWoooApplicationRequestState(
            fieldName,
            fieldValue
          ),
        },
      };
    });
  };

  return {
    woooApplicationRequestStates,
    updateWoooApplicationRequestState,
    setWoooApplicationRequestStates,
  };
};

export default useWoooApplicationRequestStates;
