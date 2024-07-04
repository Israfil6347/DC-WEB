import { useState, useContext } from 'react';
import { validateSchemeDepositState } from '../validate/validateSchemeDepositState';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';

interface Nominee {
  id?: number;
  PersonId?: number;
  NomineePercentage?: number;
  selectedNomineeName?: string;
}
export interface SchemeDepositState {
  accountHolder: string;
  tenure: string;
  amount: string;
  accountHolderName: string;
  nomineePercentage: string;
  selectedNomineeName: string;
  selectedNominee: string;
  DurationInMonths: number;
  CardAccount?: string;
  CardNo?: string;
  CardPIN?: string;
  Interest: number;
  AccountTypeName: string;
  AccountType: string;
  JointNominee: Nominee[];
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
    AccountTypeName: string;
    AccountType: string;
    JointNominee: string;
    tenureId: string;
    WithdrawableBalance: string;
  };
  // selectedNominees: any;
}

function useSchemeDepositAccountState() {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const defaultAccount = authUser.PersonId.toString();
  const defaultAccountName = authUser.UserName.toString();

  const [schemeDepositState, setSchemeDepositState] =
    useState<SchemeDepositState>({
      accountHolder: defaultAccount,
      tenure: '',
      amount: '',
      AccountType: '01',
      AccountTypeName: '',
      nomineePercentage: '100',
      selectedNomineeName: '',
      selectedNominee: '',
      accountHolderName: defaultAccountName,
      DurationInMonths: 0,
      Interest: 0,
      JointNominee: [],
      tenureId: 0,
      WithdrawableBalance: 0,
      Errors: {
        accountHolder: '',
        AccountTypeName: '',
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
        tenureId: '',
        WithdrawableBalance: '',
      },
    });

  const updateSchemeDepositState = (
    fieldName: string,
    fieldValue: any,
    WithdrawableBalance?: any
  ) => {
    setSchemeDepositState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: validateSchemeDepositState(
            fieldName,
            fieldValue,
            WithdrawableBalance
          ),
        },
      };
    });
  };

  const nomineeAddHandler = (PersonFamilyAndRelatives: any) => {
    const selectedNominee = PersonFamilyAndRelatives.find(
      (nominee: any) =>
        nominee.value.toString() === schemeDepositState.selectedNominee
    );

    if (selectedNominee) {
      setSchemeDepositState((prevState) => {
        const totalPercentage = prevState.JointNominee.reduce(
          (sum: number, nominee: Nominee) =>
            sum + (nominee.NomineePercentage ?? 0),
          0
        );

        if (
          totalPercentage + parseInt(schemeDepositState.nomineePercentage) <=
          100
        ) {
          if (prevState.AccountType === '01') {
            const nomineeData: Nominee = {
              id: selectedNominee.id,
              PersonId: selectedNominee.value,
              selectedNomineeName: selectedNominee.label,
              NomineePercentage: parseInt(schemeDepositState.nomineePercentage),
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
                  schemeDepositState.nomineePercentage
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
    setSchemeDepositState((prevState) => ({
      ...prevState,
      JointNominee: prevState.JointNominee.filter(
        (nominee: any) => nominee.id !== id
      ),
    }));
  };

  return {
    schemeDepositState,
    updateSchemeDepositState,
    removeNomineeHandler,
    nomineeAddHandler,
    // handleDropdownChange,
    setSchemeDepositState,
  };
}

export default useSchemeDepositAccountState;
