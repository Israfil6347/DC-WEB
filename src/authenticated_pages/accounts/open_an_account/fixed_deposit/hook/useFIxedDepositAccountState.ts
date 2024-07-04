import { useState, useContext } from 'react';

import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';

import { validateFixedDepositState } from '../validate/validateFixedDepositState';

interface Nominee {
  id?: number;
  PersonId?: number;
  NomineePercentage?: number;
  selectedNomineeName?: string;
}
export interface FixedDepositState {
  accountHolder: string;
  tenure: string;
  amount: string;
  accountHolderName: string;
  nomineePercentage: string;
  selectedNomineeName: string;
  selectedNominee: number;
  DurationInMonths: number;
  CardAccount?: string;
  CardNo?: string;
  CardPIN?: string;
  Interest: number;
  AccountType: string;
  JointNominee: Nominee[];
  AccountTypeName: string;
  tenureId: number;
  WithdrawableBalance: number;
  Errors: {
    accountHolder: string;
    accountHolderName: string;
    tenure: string;
    amount: string;
    nomineePercentage: string;
    selectedNominee: string;
    DurationInMonths: string;
    selectedNomineeName: string;
    CardAccount?: string;
    CardNo?: string;
    CardPIN?: string;
    Interest: string;
    AccountType: string;
    JointNominee: string;
    AccountTypeName: string;
    tenureId: string;
    WithdrawableBalance: string;
  };
  // selectedNominees: any;
}

function useFIxedDepositAccountState() {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const defaultAccount = authUser.PersonId.toString();
  const defaultAccountName = authUser.UserName.toString();

  const [fixedDepositState, setFixedDepositState] = useState<FixedDepositState>(
    {
      accountHolder: defaultAccount,
      tenure: '',
      amount: '',
      AccountType: '01',
      nomineePercentage: '100',
      selectedNomineeName: '',
      selectedNominee: 0,
      accountHolderName: defaultAccountName,
      DurationInMonths: 0,
      Interest: 0,
      JointNominee: [],
      CardAccount: '',
      AccountTypeName: '',
      tenureId: 0,
      WithdrawableBalance: 0,
      Errors: {
        accountHolder: '',
        accountHolderName: '',
        AccountType: '',
        tenure: '',
        amount: '',
        nomineePercentage: '',
        selectedNominee: '',
        selectedNomineeName: '',
        DurationInMonths: '',
        Interest: '',
        JointNominee: '',
        CardAccount: '',
        AccountTypeName: '',
        tenureId: '',
        WithdrawableBalance: '',
      },
    }
  );

  const updateFixedDepositState = (
    fieldName: string,
    fieldValue: any,
    MinimumDepositAmount?: any,
    WithdrawableBalance?: any
  ) => {
    setFixedDepositState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: validateFixedDepositState(
            fieldName,
            fieldValue,
            MinimumDepositAmount,
            WithdrawableBalance
          ),
        },
      };
    });
  };

  const nomineeAddHandler = (PersonFamilyAndRelatives: any) => {
    const selectedNominee = PersonFamilyAndRelatives.find(
      (nominee: any) =>
        nominee.value.toString() === fixedDepositState.selectedNominee
    );

    if (selectedNominee) {
      setFixedDepositState((prevState) => {
        const totalPercentage = prevState.JointNominee.reduce(
          (sum: number, nominee: Nominee) =>
            sum + (nominee.NomineePercentage ?? 0),
          0
        );

        if (
          totalPercentage + parseInt(fixedDepositState.nomineePercentage) <=
          100
        ) {
          if (prevState.AccountType === '01') {
            const nomineeData: Nominee = {
              id: selectedNominee.id,
              PersonId: selectedNominee.value,
              selectedNomineeName: selectedNominee.label,
              NomineePercentage: parseInt(fixedDepositState.nomineePercentage),
            };

            return {
              ...prevState,
              JointNominee: [nomineeData],
            };
          } else {
            if (
              !prevState.JointNominee.some(
                (nominee: Nominee) => nominee.PersonId === selectedNominee.value
              )
            ) {
              const nomineeWithPercentage: Nominee = {
                id: selectedNominee.id,
                PersonId: selectedNominee.value,
                selectedNomineeName: selectedNominee.label,
                NomineePercentage: parseInt(
                  fixedDepositState.nomineePercentage
                ),
              };

              return {
                ...prevState,
                JointNominee: [
                  ...prevState.JointNominee,
                  nomineeWithPercentage,
                ],
              };
            }
          }
        }

        return prevState;
      });

      const {
        id,
        selectedNominee: any,
        selectedNomineeName,
        nomineePercentage,
      } = selectedNominee;
      return { id, selectedNominee, selectedNomineeName, nomineePercentage };
    }

    return null;
  };

  const removeNomineeHandler = (id: number) => {
    setFixedDepositState((prevState) => ({
      ...prevState,
      JointNominee: prevState.JointNominee.filter(
        (nominee: any) => nominee.id !== id
      ),
    }));
  };

  return {
    fixedDepositState,
    updateFixedDepositState,
    removeNomineeHandler,
    nomineeAddHandler,
    // handleDropdownChange,
    setFixedDepositState,
  };
}

export default useFIxedDepositAccountState;
