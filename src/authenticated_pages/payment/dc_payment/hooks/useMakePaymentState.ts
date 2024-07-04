import { useState } from 'react';
import { validateMakePaymentState } from '../validation/validateMakePaymentState';

/**========================================================================
 * ?                                ABOUT
 * @author         :  Md Israfil
 * @designation    :  Web Developer
 * @email          :  israfilm408@gmail.com
 * @description    :
 * @createdOn      :  01 July 2023
 * @updatedBy      :  Israfil
 * @updatedOn      :  16 Jan 2024
 *========================================================================**/

function useMakePaymentState() {
  const [makePaymentState, setMakePaymentState] = useState({
    ServiceName: '',
    AccountNumber: '',
    Amount: '',
    Reference: '',
    CardNo: '',
    CardAccount: '',
    CardPIN: '',
    ServiceCode: '',
    Balance: 0,
    WithdrawableBalance: 0,
    AccountTypeName: '',
    NotifyPerson: [
      {
        PersonId: 0,
        FullName: '',
      },
    ],
    selectNotifyPerson: '',
    Errors: {
      ServiceCode: '',
      ServiceName: '',
      Amount: '',
      Reference: '',
      CardPIN: '',
      CardNo: '',
      CardAccount: '',
      AccountNumber: '',
      selectNotifyPerson: '',
      Balance: '',
      WithdrawableBalance: '',
      AccountTypeName: '',
    },
  });

  const updateMakePaymentState = (fieldName: string, fieldValue: any) => {
    setMakePaymentState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: validateMakePaymentState(
            fieldName,
            fieldValue,
            makePaymentState?.WithdrawableBalance
          ),
        },
      };
    });
  };

  return {
    makePaymentState,
    updateMakePaymentState,
  };
}

export default useMakePaymentState;
