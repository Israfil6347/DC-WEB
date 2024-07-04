import { useState } from 'react';
import { bKashTransferValidation } from '../validation/bKashTransferValidation';

function useTransferbKash() {
  const [bKashTransferRequestState, setTransferbKashRequestState] = useState({
    Amount: '',
    AccountNo: '',
    TransferToAcc: '',
    RecipientName: '',
    AccountTypeName: '',
    CardAccount: '',
    AccType: '',
    CardPIN: '',
    WithdrawableBalance: '',
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
      WithdrawableBalance: '',
    },
  });

  const updateTransferbKashRequestState = (
    fieldName: string,
    fieldValue: any,
    Balance?: any
  ) => {
    setTransferbKashRequestState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: bKashTransferValidation(fieldName, fieldValue, Balance),
        },
      };
    });
  };

  //   const setSameAccountError = (fieldName: string, fieldValue: any) => {
  //     setTransferbKashRequestState((prevState) => {
  //       return {
  //         ...prevState,
  //         [fieldName]: fieldValue,
  //         Errors: {
  //           ...prevState.Errors,
  //           TransferToAcc: "You can't transfer to your own account.",
  //         },
  //       };
  //     });
  //   };

  return {
    // setSameAccountError,
    updateTransferbKashRequestState,
    bKashTransferRequestState,
    setTransferbKashRequestState,
  };
}

export default useTransferbKash;
