import { useState, useContext } from 'react';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import { validateInsuranceDepositState } from '../validate/validateInsuranceDepositState';

interface Nominee {
  id?: number;
  PersonId?: number;
  NomineePercentage?: number;
  selectedNomineeName?: string;
}
export interface InsuranceDepositState {
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
  AccountType: string;
  JointNominee: Nominee[];
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
    AccountType: string;
    JointNominee: string;
  };
}

function useInsuranceDepositAccountState() {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const defaultAccount = authUser.PersonId.toString();
  const defaultAccountName = authUser.UserName.toString();

  const [insuranceDepositState, setInsuranceDepositState] =
    useState<InsuranceDepositState>({
      accountHolder: defaultAccount,
      tenure: '',
      amount: '',
      AccountType: '01',
      nomineePercentage: '100',
      selectedNomineeName: '',
      selectedNominee: 0,
      accountHolderName: defaultAccountName,
      DurationInMonths: 0,
      JointNominee: [],
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
        JointNominee: '',
      },
    });

  const updateInsuranceDepositState = (
    fieldName: string,
    fieldValue: any,
    MinimumDepositAmount?: any
  ) => {
    setInsuranceDepositState((prevState) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: {
          ...prevState.Errors,
          [fieldName]: validateInsuranceDepositState(
            fieldName,
            fieldValue,
            MinimumDepositAmount
          ),
        },
      };
    });
  };

  const nomineeAddHandler = (PersonFamilyAndRelatives: any) => {
    const selectedNominee = PersonFamilyAndRelatives.find(
      (nominee: any) =>
        nominee.value.toString() === insuranceDepositState.selectedNominee
    );

    if (selectedNominee) {
      setInsuranceDepositState((prevState) => {
        const totalPercentage = prevState.JointNominee.reduce(
          (sum: number, nominee: Nominee) =>
            sum + (nominee.NomineePercentage ?? 0),
          0
        );

        if (
          totalPercentage + parseInt(insuranceDepositState.nomineePercentage) <=
          100
        ) {
          if (prevState.AccountType === '01') {
            const nomineeData: Nominee = {
              id: selectedNominee.id,
              PersonId: selectedNominee.value,
              selectedNomineeName: selectedNominee.label,
              NomineePercentage: parseInt(
                insuranceDepositState.nomineePercentage
              ),
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
                  insuranceDepositState.nomineePercentage
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
    setInsuranceDepositState((prevState) => ({
      ...prevState,
      JointNominee: prevState.JointNominee.filter(
        (nominee: any) => nominee.id !== id
      ),
    }));
  };

  return {
    insuranceDepositState,
    updateInsuranceDepositState,
    removeNomineeHandler,
    nomineeAddHandler,
    // handleDropdownChange,
    setInsuranceDepositState,
  };
}

export default useInsuranceDepositAccountState;
