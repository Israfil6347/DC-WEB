import { useState } from 'react';
import { fundTransferValidation } from '../utils/fundTransferValidation';

function useTransferWithDc() {
  const [fundTransferRequestState, setFundTransferRequestState] = useState({
    Amount: '',
    AccountNo: '',
    TransferToAcc: '',
    RecipientName: '',
    AccountTypeName: '',
    CardAccount: '',
    AccType: '',
    CardPIN: '',
    CardNo: '',
    Errors: {
      Amount: '',
      AccountNo: '',
      CardAccount: '',
      SecretKey: '',
      TransferToAcc: '',
      RecipientName: '',
      AccountTypeName: '',
      AccType: '',
      CardPIN: '',
      CardNo: '',
    },
  });

  const updateFundTransferRequestState = (
    fieldName: string,
    fieldValue: any
  ) => {
    setFundTransferRequestState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: fundTransferValidation(
            fieldName,
            fieldValue,
            fundTransferRequestState?.CardAccount
          ),
        },
      };
    });
  };

  const setSameAccountError = (fieldName: string, fieldValue: any) => {
    setFundTransferRequestState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          TransferToAcc: "You can't transfer to your own account.",
        },
      };
    });
  };

  return {
    setSameAccountError,
    updateFundTransferRequestState,
    fundTransferRequestState,
    setFundTransferRequestState,
  };
}

export default useTransferWithDc;
