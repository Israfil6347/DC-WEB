import { useState } from 'react';
import { validateAddDependantState } from '../validation/validateAddDependantState';

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

function useAddDependantState() {
  const [addDependantState, setAddDependantState] = useState({
    Dependent: '',
    dependentAccounts: '',
    MobileNumber: '',
    Errors: {
      Dependent: '',
      dependentAccounts: '',
      MobileNumber: '',
    },
  });

  const updateAddDependantState = (fieldName: string, fieldValue: any) => {
    setAddDependantState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: validateAddDependantState(fieldName, fieldValue),
        },
      };
    });
  };

  return {
    addDependantState,
    updateAddDependantState,
    setAddDependantState,
  };
}

export default useAddDependantState;
