import {
  Box,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FamilyAndRelativeViewModel } from 'authenticated_pages/info/family_and_relatives/model/data/FamilyAndRelativeViewModel';
import { CardModel } from 'authenticated_pages/info/financial_card/model/data/CardModel';
import CardAccountPinView from 'authenticated_pages/shared/components/CardAccountPinView';
import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import MyButton from 'global_shared/components/MyButton';
import MyDropdown from 'global_shared/components/MyDropdown';
import MyTextInput from 'global_shared/components/MyTextInput';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import useCardPinRemainingTry from 'global_shared/hooks/useCardPinRemainingTry';
import useCommand from 'global_shared/hooks/useCommand';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { validateInsuranceDepositState } from './validate/validateInsuranceDepositState';

import MyModal from 'global_shared/components/MyModal';
import { Size } from 'global_shared/enum/Size';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetAccountOpeningEligibilityRequestModel } from './model/request/GetAccountOpeningEligibilityRequestModel';
import { GetDurationAmountsRequestModel } from './model/request/GetDurationAmountsRequestModel';
import { GetDurationsRequestModel } from './model/request/GetDurationsRequestModel';

import OTPValidationView from 'authentication/otp_validation/OTPValidationView';
import CryptoJS from 'crypto-js';
import FailedDialogue from 'global_shared/components/dialogues/FailedDialogue';
import LoaderDialogue from 'global_shared/components/dialogues/LoaderDialogue';
import MyDialogueView from 'global_shared/components/dialogues/MyDialogueView';
import SuccessDialogue from 'global_shared/components/dialogues/SuccessDialogue';
import { SubmitInsuranceDepositRequestModel } from './model/request/SubmitInsuranceDepositRequestModel';
import { FamilyAndRelativesRequestModel } from './model/request/FamilyAndRelativesRequestModel';
import { CardLockRequestModel } from 'authenticated_pages/shared/model/request/CardLockRequestModel';
import useInsuranceDepositAccountState from './hook/useInsuranceDepositAccountState';
import CardPage from 'authenticated_pages/info/financial_card/CardPage';

const steps = [
  // 'TRANSFER FROM',
  'ACCOUNT FOR',
  'ACCOUNT DETAILS',
  'NOMINEE',
  'PREVIEW',
  'CARD PIN VERIFY',
];

const AccountType = [
  { id: 1, value: '01', label: 'Individual' },
  { id: 2, value: '02', label: 'Join Account' },
  { id: 2, value: '03', label: 'Organization' },
];

interface Nominee {
  id?: number;
  PersonId?: number;
  NomineePercentage?: number;
  selectedNomineeName?: string;
}

function InsuranceDeposit() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { authUser } = React.useContext(AuthUserContext) as AuthUserContextType;
  const location = useLocation();
  const urlArrays = location.pathname.split('/');
  const navigate = useNavigate();

  const [nomineePercentage, setNomineePercentage] = useState<
    string | undefined
  >('');
  const [MinimumDepositAmount, setMinimumDepositAmount] = useState<
    number | undefined
  >(0);

  const [nomineeByIndividualPercentage, setNomineeByIndividualPercentage] =
    useState<Nominee>({
      PersonId: 0,
      NomineePercentage: 100,
    });

  const [selectAccount, setSelectedAccount] = useState<
    FamilyAndRelativeViewModel[] | undefined
  >([]);

  const [OperatorName, setIndividualOperator] = useState<any>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const stepStyle = isMobile ? { flexDirection: 'flex-row' } : {};

  const {
    insuranceDepositState,
    updateInsuranceDepositState,
    nomineeAddHandler,
    removeNomineeHandler,
  } = useInsuranceDepositAccountState();

  const { cardPinRemainingTry, updateCardPinRemainingTry } =
    useCardPinRemainingTry();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const {
    loading: myCardsResponseDataLoading,
    data: myCardsResponseData,
    executeCommand: myCardsRequestCommand,
  } = useCommand<CardModel[] | null>();

  const {
    loading: cardLockResponseDataLoading,
    data: cardLockResponseData,
    status: cardLockResponseDataStatus,
    setStatus: setCardLockResponseStatus,
    executeCommand: cardLockRequestExecuteCommand,
  } = useCommand<string>();

  const {
    loading: getFamilyAndRelativesResponseDataLoading,
    data: getFamilyAndRelativesResponseData,
    executeCommand: getFamilyAndRelativesRequestCommand,
  } = useCommand<FamilyAndRelativeViewModel[]>();
  const {
    loading: getPersonFamilyAndRelativesResponseDataLoading,
    executeCommand: getPersonFamilyAndRelativesRequestCommand,
  } = useCommand<FamilyAndRelativeViewModel[]>();

  const {
    loading: getDurationsResponseDataLoading,
    data: getDurationsResponseData,
    executeCommand: getDurationsRequestExecuteCommand,
  } = useCommand<string | any>();
  const {
    loading: getDurationAmountsResponseDataLoading,
    executeCommand: getDurationAmountsRequestExecuteCommand,
  } = useCommand<string | any>();
  const {
    loading: accountOpeningEligibilityResponseDataLoading,
    data: accountOpeningEligibilityResponseData,
    message: accountOpeningEligibilityResponseMessage,
    setData: setAccountOpeningEligibilityResponseData,
    executeCommand: AccountOpeningEligibilityExecuteCommand,
  } = useCommand<string | any>();

  const {
    loading: verifyPINResponseDataLoading,
    data: verifyPINResponseData,
    message: verifyPINResponseMessage,
    status: verifyPINResponseStatus,
    setStatus: setVerifyPINResponseStatus,
    executeCommand: verifyPINRequestExecuteCommand,
  } = useCommand<SubmitInsuranceDepositRequestModel>();

  const {
    loading: submitInsuranceDepositResponseDataLoading,
    data: submitInsuranceDepositResponseData,
    message: submitInsuranceDepositResponseMessage,
    status: submitInsuranceDepositResponseStatus,
    setStatus: setSubmitInsuranceDepositResponseStatus,
    executeCommand: submitInsuranceDepositExecuteCommand,
  } = useCommand<string | null>();

  const productName = localStorage.getItem('ProductName');

  React.useEffect(() => {
    var personalCardInfoObject = new BaseRequestModel(authUser);
    myCardsRequestCommand(
      process.env.REACT_APP_BASE_URL + '/cards_V2/myCards',
      JSON.stringify(personalCardInfoObject),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  }, [cardLockResponseData]);
  useEffect(() => {
    if (myCardsResponseData !== null) {
      updateInsuranceDepositState(
        'CardNo',
        myCardsResponseData?.[0].CardNo?.trim()
      );
      updateInsuranceDepositState(
        'CardAccount',
        myCardsResponseData?.[0].CardsAccounts?.[0].AccountNumber.trim()
      );
    }

    const addFamilyRequestModel = new FamilyAndRelativesRequestModel(authUser);
    addFamilyRequestModel.IncludeSelf = true;
    getFamilyAndRelativesRequestCommand(
      process.env.REACT_APP_BASE_URL + '/info_V1/getFamilyAndRelatives',
      JSON.stringify(addFamilyRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );

    const getDurationsRequestModel = new GetDurationsRequestModel(authUser);
    getDurationsRequestModel.ProductCode = urlArrays[4];

    getDurationsRequestModel.RolePermissionId = '6, 1, 1210';

    getDurationsRequestExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/Accounts_V1/getDurations',
      JSON.stringify(getDurationsRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    checkeligibleHandler(authUser.PersonId);

    if (getDurationsResponseData?.length === 1) {
      updateInsuranceDepositState(
        'tenure',
        getDurationsResponseData?.[0]?.DurationName
      );
      updateInsuranceDepositState(
        'DurationInMonths',
        getDurationsResponseData?.[0]?.DurationInMonths
      );
      updateInsuranceDepositState(
        'Interest',
        getDurationsResponseData?.[0]?.InterestRate
      );
      updateInsuranceDepositState(
        'Interest',
        getDurationsResponseData?.[0]?.InterestRate
      );
      setMinimumDepositAmount(
        getDurationsResponseData?.[0]?.MinimumDepositAmount
      );
    }

    if (PersonFamilyAndRelatives.length === 1) {
      updateInsuranceDepositState(
        'selectedNominee',
        PersonFamilyAndRelatives?.[0]?.value
      );

      updateInsuranceDepositState(
        'selectedNomineeName',
        PersonFamilyAndRelatives?.[0]?.label
      );
      updatePersonId(PersonFamilyAndRelatives?.[0]?.value);

      if (insuranceDepositState.AccountType === '01') {
        nomineeAddHandler(PersonFamilyAndRelatives);
      }
    } else {
      updateInsuranceDepositState('selectedNominee', '');

      updateInsuranceDepositState('selectedNomineeName', '');
    }
  }, [myCardsResponseData, insuranceDepositState?.accountHolder]);

  const handleTenureChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = getDurationsResponseData?.find((obj: any) => {
      if (parseInt(event.target.value) === obj?.DurationId)
        return {
          label: obj?.DurationName!,
          value: obj?.DurationId!,
          DurationInMonths: obj?.DurationInMonths,
        };
    });
    updateInsuranceDepositState('tenure', selected?.DurationName);
    updateInsuranceDepositState('DurationInMonths', selected?.DurationInMonths);
    updateInsuranceDepositState('Interest', selected?.InterestRate);
    setMinimumDepositAmount(selected?.MinimumDepositAmount);
  };
  useEffect(() => {
    const getDurationAmountsRequestModel = new GetDurationAmountsRequestModel(
      authUser
    );
    getDurationAmountsRequestModel.Duration =
      insuranceDepositState.DurationInMonths;
    getDurationAmountsRequestModel.ProductCode = urlArrays[4];
    getDurationAmountsRequestModel.RolePermissionId = '6,1,1210';

    getDurationAmountsRequestExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/Accounts_V1/getDurations',
      JSON.stringify(getDurationAmountsRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  }, [insuranceDepositState.DurationInMonths]);

  const cardLockRequestHandler = () => {
    if (cardPinRemainingTry !== 0) {
      updateCardPinRemainingTry(1);
    } else {
      const cardLockRequestModel = new CardLockRequestModel(authUser);
      cardLockRequestModel.NameOnCard = myCardsResponseData?.[0]?.Name;
      cardLockRequestModel.CardNo = myCardsResponseData?.[0]?.CardNo;

      cardLockRequestExecuteCommand(
        process.env.REACT_APP_BASE_URL + '/cards_V1/lockTheCard',
        JSON.stringify(cardLockRequestModel),
        {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
        }
      );
    }
  };

  const FamilyAndRelatives = (getFamilyAndRelativesResponseData || [])
    .map((obj, index) => {
      if (
        obj &&
        obj.RequestStatus === 'Pending For Approval'
        //  &&
        // obj.Age >= 18
      ) {
        return null;
      }
      if (
        (obj.Age !== undefined && obj.Age <= 18) ||
        obj.PersonId === authUser.PersonId
      ) {
        return {
          id: index,
          label: obj.FullName || '',
          value: obj.PersonId || '',
        };
      }
      return null;
    })
    .filter(Boolean);
  let PersonFamilyAndRelatives: any;
  const AccountHolderPersonId: number = parseInt(
    insuranceDepositState?.accountHolder
  );

  if (authUser.PersonId === AccountHolderPersonId) {
    PersonFamilyAndRelatives = (getFamilyAndRelativesResponseData || [])
      .map((obj, index) => {
        if (
          obj &&
          obj.RequestStatus !== 'Pending For Approval' &&
          obj?.PersonId?.toString() !== authUser?.PersonId?.toString()
        ) {
          return {
            id: index,
            label: obj.FullName || '',
            value: obj.PersonId || '',
          };
        }
      })
      .filter(Boolean);
  } else {
    PersonFamilyAndRelatives = (getFamilyAndRelativesResponseData || [])
      .map((obj, index) => {
        if (
          obj &&
          obj.RequestStatus !== 'Pending For Approval' &&
          obj?.PersonId?.toString() === authUser?.PersonId?.toString()
        ) {
          return {
            id: index,
            label: obj.FullName || '',
            value: obj.PersonId || '',
          };
          // updateSchemeDepositState('nominee', obj?.PersonId);
        }
      })
      .filter(Boolean);
  }

  const addAccountsHolderHandler = (accountNumber: string) => {
    const selected = getFamilyAndRelativesResponseData?.find((obj: any) => {
      return parseInt(accountNumber) === obj?.PersonId;
    });

    if (selected && insuranceDepositState.AccountType !== '01') {
      setSelectedAccount((prevSelected = []) => {
        const isAccountHolderAdded = prevSelected.some(
          (item) => item.PersonId === selected.PersonId
        );

        if (!isAccountHolderAdded) {
          const updatedSelected =
            insuranceDepositState.AccountType === '03'
              ? { ...selected, IsOrganization: true }
              : { ...selected, IsOrganization: false };

          return [...prevSelected, updatedSelected];
        } else {
          const updatedSelectedArray = prevSelected.map((item) =>
            item.PersonId === selected.PersonId
              ? { ...selected, IsOrganization: item.IsOrganization }
              : item
          );

          return updatedSelectedArray;
        }
      });

      return {
        PersonId: selected.PersonId,
        IsOrganization: selected.IsOrganization,
      };
    }

    return null;
  };

  // const accountDateformat = (accountData: any) =>
  //   accountData
  //     .map((obj: any) => {
  //       return {
  //         AccountHolderId: obj.PersonId || '',
  //         IsOrganization: obj.hasOwnProperty('IsOrganization')
  //           ? obj.IsOrganization
  //           : '',
  //         SavingsACNumber: '' || '',
  //         MembershipNumber: '' || '',
  //       };
  //     })
  //     .filter(Boolean);
  // const accountoperatorformat = (accountData: any) =>
  //   accountData
  //     .map((obj: any) => {
  //       if (obj.Age >= 18) {
  //         return {
  //           AccountHolderId: obj.PersonId || '',
  //           AccountOperatorId: obj.PersonId || '',
  //         };
  //       } else {
  //         return {
  //           AccountHolderId: obj.PersonId || '',
  //           AccountOperatorId: !!authUser ? authUser.PersonId : 0,
  //         };
  //       }
  //     })
  //     .filter(Boolean);

  const removeAccountsHandler = (id: number) => {
    setSelectedAccount((prevSelected) => {
      if (prevSelected) {
        const updatedAccounts = prevSelected.filter(
          (account) => account.PersonId !== id
        );
        return updatedAccounts;
      } else {
        return prevSelected;
      }
    });
  };

  const updateOperatorNameHandler = (id: any) => {
    const selected = getFamilyAndRelativesResponseData?.find(
      (obj: FamilyAndRelativeViewModel) => {
        return parseInt(id) === obj?.PersonId;
      }
    );

    setIndividualOperator(selected);
  };

  const checkeligibleHandler = (PersonId: any) => {
    const getAccountOpeningEligibilityRequestModel =
      new GetAccountOpeningEligibilityRequestModel(authUser);
    getAccountOpeningEligibilityRequestModel.AccountHolderPersonId = PersonId;
    getAccountOpeningEligibilityRequestModel.AccountTypeCode = urlArrays[4];

    AccountOpeningEligibilityExecuteCommand(
      process.env.REACT_APP_BASE_URL +
        '/Accounts_V1/getAccountOpeningEligibility',
      JSON.stringify(getAccountOpeningEligibilityRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };

  useEffect(() => {
    const addFamilyRequestModel = new BaseRequestModel(authUser);
    addFamilyRequestModel.PersonId = parseInt(
      insuranceDepositState?.accountHolder
    );
    getPersonFamilyAndRelativesRequestCommand(
      process.env.REACT_APP_BASE_URL + '/info_V1/getFamilyAndRelatives',
      JSON.stringify(addFamilyRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    checkeligibleHandler(authUser.PersonId);
  }, [insuranceDepositState?.accountHolder]);

  const updatePersonId = (newPersonId: any) => {
    setNomineeByIndividualPercentage((prevNominee) => ({
      ...prevNominee,
      PersonId: parseInt(newPersonId),
    }));
  };

  const nomineeArray = [nomineeByIndividualPercentage];

  const verifySchemeDepositPinRequestHandler = () => {
    var encryptPassword = CryptoJS.MD5(insuranceDepositState?.CardPIN!);
    const submitInsuranceDepositRequestModel =
      new SubmitInsuranceDepositRequestModel(authUser);
    submitInsuranceDepositRequestModel.DMSProductCode = urlArrays[4];
    submitInsuranceDepositRequestModel.AccountNo =
      insuranceDepositState?.CardAccount || '';
    submitInsuranceDepositRequestModel.BranchCode = '01';
    submitInsuranceDepositRequestModel.AccountFor = parseInt(
      insuranceDepositState.AccountType
    );
    submitInsuranceDepositRequestModel.ApplicationNo = '';
    submitInsuranceDepositRequestModel.AccountName =
      insuranceDepositState.accountHolderName;
    // submitSchemeDepositRequestModel.InterestRate = schemeDepositState.Interest;
    submitInsuranceDepositRequestModel.Duration =
      insuranceDepositState.DurationInMonths;
    submitInsuranceDepositRequestModel.InstallmentAmount = parseInt(
      insuranceDepositState.amount
    );
    submitInsuranceDepositRequestModel.TxnAccountNumber =
      insuranceDepositState?.CardAccount || '';
    submitInsuranceDepositRequestModel.CardNo =
      myCardsResponseData?.[0]?.CardNo!;
    submitInsuranceDepositRequestModel.NameOnCard =
      myCardsResponseData?.[0]?.Name!;
    submitInsuranceDepositRequestModel.SecretKey = encryptPassword.toString();
    submitInsuranceDepositRequestModel.AccountHolders = [
      {
        AccountHolderId: parseInt(insuranceDepositState?.accountHolder),
        IsOrganization: false,
        SavingsACNumber: insuranceDepositState?.CardAccount || '',
        MembershipNumber: '',
      },
    ];
    submitInsuranceDepositRequestModel.AccountOperators = [
      {
        AccountHolderId: parseInt(insuranceDepositState?.accountHolder),
        AccountOperatorId: authUser?.PersonId,
      },
    ];
    submitInsuranceDepositRequestModel.Nominees =
      insuranceDepositState.AccountType === '01'
        ? nomineeArray
        : insuranceDepositState.JointNominee;
    submitInsuranceDepositRequestModel.Introducers = [];

    verifyPINRequestExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/cards_V1/verifyCardPIN',
      JSON.stringify(submitInsuranceDepositRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };

  const otpDataRequestHandler = (otpData: string) => {
    if (verifyPINResponseData) {
      verifyPINResponseData.OTPValue = otpData;
    }

    submitInsuranceDepositExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/Accounts_V1/createDepositAccount',
      JSON.stringify(verifyPINResponseData),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };
  const handleAccountHolderChange = (event: any) => {
    const selected = FamilyAndRelatives?.find((obj) => {
      if (parseInt(event.target.value) === obj?.value)
        return {
          value: obj?.value,
          label: obj?.label,
        };
    });
    checkeligibleHandler(event.target.value);
    if (insuranceDepositState?.AccountType === '01') {
      addAccountsHolderHandler(event.target.value);
    }
    updateOperatorNameHandler(selected?.value);

    updateInsuranceDepositState('accountHolder', event.target.value);

    updateInsuranceDepositState('accountHolderName', selected?.label);
  };

  const nomineeStateUpdateHandler = () => {
    if (PersonFamilyAndRelatives?.length === 1) {
      updateInsuranceDepositState(
        'selectedNominee',
        PersonFamilyAndRelatives[0]?.value.toString()
      );
      updateInsuranceDepositState(
        'selectedNomineeName',
        PersonFamilyAndRelatives[0]?.label
      );
    } else {
      updateInsuranceDepositState('selectedNominee', '');
      updateInsuranceDepositState('selectedNomineeName', '');
    }
  };
  if (myCardsResponseData?.length === 0) {
    return <CardPage />;
  } else {
    return (
      <div>
        <LoaderDialogue
          isLoading={
            verifyPINResponseDataLoading ||
            myCardsResponseDataLoading ||
            cardLockResponseDataLoading ||
            getFamilyAndRelativesResponseDataLoading ||
            getPersonFamilyAndRelativesResponseDataLoading ||
            getDurationsResponseDataLoading ||
            getDurationAmountsResponseDataLoading ||
            accountOpeningEligibilityResponseDataLoading ||
            submitInsuranceDepositResponseDataLoading
          }
        />
        <SuccessDialogue
          isDialogueOpen={
            cardLockResponseDataStatus === 'success' ? true : false
          }
          onOkButtonClick={() => {
            setCardLockResponseStatus(null);
          }}
        >
          <p id="cardLockResponseData">{cardLockResponseData}</p>
        </SuccessDialogue>
        <FailedDialogue
          dialogueSize={Size.Small}
          isDialogueOpen={
            submitInsuranceDepositResponseStatus === 'failed' ? true : false
          }
          cancelButtonText="ok"
          onCloseButtonClick={() => {
            setSubmitInsuranceDepositResponseStatus(null);
          }}
        >
          {submitInsuranceDepositResponseMessage}
        </FailedDialogue>

        <FailedDialogue
          dialogueSize={Size.Small}
          isDialogueOpen={
            submitInsuranceDepositResponseStatus === 'failed' ? true : false
          }
          cancelButtonText="Retry"
          OkButtonText="Back"
          onCloseButtonClick={() => {
            setSubmitInsuranceDepositResponseStatus(null);
          }}
          onOkButtonClick={() => {
            navigate('/accounts/open_an_account');
          }}
        >
          {submitInsuranceDepositResponseMessage}
        </FailedDialogue>
        <SuccessDialogue
          isDialogueOpen={
            submitInsuranceDepositResponseStatus === 'success' ? true : false
          }
          onCloseButtonClick={() => {
            setSubmitInsuranceDepositResponseStatus(null);
            setVerifyPINResponseStatus(null);
            navigate('/accounts/my_accounts');
          }}
        >
          <p id="submitInsuranceDepositResponseData">
            {submitInsuranceDepositResponseData}
          </p>
        </SuccessDialogue>
        {verifyPINResponseStatus === 'success' && (
          <OTPValidationView
            isOTPValidationViewOpen={
              verifyPINResponseStatus === 'success' ? true : false
            }
            closeOTPValidationView={() => {
              setVerifyPINResponseStatus(null);
            }}
            otpValidateRequestHandler={otpDataRequestHandler}
            resendOTPRequestHandler={verifySchemeDepositPinRequestHandler}
          />
        )}
        {verifyPINResponseMessage?.includes('Invalid Card PIN') && (
          <FailedDialogue
            dialogueSize={Size.Small}
            isDialogueOpen={verifyPINResponseStatus === 'failed' ? true : false}
            cancelButtonText="ok"
            onCloseButtonClick={() => {
              setVerifyPINResponseStatus(null);
              cardLockRequestHandler();
            }}
          >
            {verifyPINResponseMessage +
              '. ' +
              'Remaining Tries ' +
              ' ' +
              cardPinRemainingTry}
          </FailedDialogue>
        )}
        <MyModal
          size={Size.Small}
          show={
            accountOpeningEligibilityResponseData !== null &&
            !accountOpeningEligibilityResponseData?.[0]?.IsEligible

            // !accountOpeningEligibilityResponseData?.[0]?.IsEligible ? true : false
          }
          onClose={() => {
            setAccountOpeningEligibilityResponseData(null);
          }}
        >
          <MyDialogueView
            dialogueHeader={
              <div className=" bg-background p-6">
                <div className="flex w-full flex-col items-center ">
                  <i className="fa-solid fa-face-frown text-6xl text-primary"></i>
                  <h3 className="mt-2  font-bold text-primary">{`Sorry! `}</h3>
                  <h3 className="mt-2  font-bold text-primary">{`This application is not eligible `}</h3>
                </div>
              </div>
            }
            dialogueFooter={
              <div className="flex items-center justify-center gap-6 bg-background px-14 py-4">
                <MyButton
                  disabled={false}
                  type="button"
                  label="ok"
                  styleClass="w-1/2 rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                  name={''}
                  onClick={() => {
                    setAccountOpeningEligibilityResponseData(null);
                  }}
                  id="AccountOpeningEligibility"
                />
              </div>
            }
            onCancel={() => {
              setAccountOpeningEligibilityResponseData(null);
            }}
          >
            <div className="mx:px-14 px-14 py-6 text-left text-onSurface ">
              <h3 className="text-lg font-bold text-error">Findings :-</h3>
              <ul className="list-disc text-lg font-semibold">
                <li className="mt-2 flex items-center gap-2 text-onSurface">
                  {accountOpeningEligibilityResponseData?.[0]
                    ?.SavingsACNumber === '-' ? (
                    <i className="fa-solid fa-circle-xmark  text-xl text-error"></i>
                  ) : (
                    <i className="fa-solid fa-circle-check text-xl text-success"></i>
                  )}
                  Savings account holder
                </li>
                <li className="mt-2 flex items-center gap-2 text-onSurface">
                  {accountOpeningEligibilityResponseData?.[0]
                    ?.IsMultipleAccountAllowed ? (
                    <i className="fa-solid fa-circle-check text-xl text-success"></i>
                  ) : (
                    <i className="fa-solid fa-circle-xmark  text-xl text-error"></i>
                  )}
                  {`Applicant can have multiple ${accountOpeningEligibilityResponseData?.[0]?.AccountTypeName}`}
                </li>
              </ul>
            </div>
          </MyDialogueView>
        </MyModal>
        <motion.div
          initial="initial"
          animate="animate"
          transition={MyTransition.StaggerChildren.Fast}
        >
          <div className="cursor-pointer">
            <section className="flex flex-col-reverse items-start gap-6 text-justify md:flex-row">
              <div className="w-full">
                <div className="">
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <motion.div
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="w-full "
                    >
                      <div className="rounded-md bg-surface p-7 shadow ">
                        <div className="md:hidden">
                          <Box sx={{ maxWidth: 400 }}>
                            <Stepper
                              activeStep={activeStep}
                              orientation="vertical"
                              // sx={stepStyle}
                            >
                              {steps.map((label) => (
                                <Step key={label}>
                                  <StepLabel>{label}</StepLabel>
                                </Step>
                              ))}
                            </Stepper>
                          </Box>
                        </div>
                        <div className="hidden md:block">
                          <Box sx={{ width: '100%' }}>
                            <Stepper
                              activeStep={activeStep}
                              alternativeLabel
                              sx={stepStyle}
                            >
                              {steps.map((label) => (
                                <Step key={label}>
                                  <StepLabel>{label}</StepLabel>
                                </Step>
                              ))}
                            </Stepper>
                          </Box>
                        </div>

                        <div>
                          {/* step 1 */}
                          {activeStep + 1 === 1 && (
                            <div className="py-8">
                              <div className="">
                                <div className="flex justify-center">
                                  <div className="w-full md:w-1/2">
                                    <div className="grid grid-cols-1 gap-6">
                                      <MyDropdown
                                        label="Account Type"
                                        name="AccountType"
                                        id="AccountType"
                                        required={true}
                                        disabled={true}
                                        leftIcon={
                                          <i className="fa-regular fa-user"></i>
                                        }
                                        error={
                                          insuranceDepositState?.Errors
                                            ?.accountHolder
                                        }
                                        value={
                                          insuranceDepositState?.AccountType
                                        }
                                        dropDownData={AccountType?.map(
                                          (obj, index) => {
                                            return {
                                              id: index,
                                              label: obj?.label!,
                                              value: obj?.value!,
                                            };
                                          }
                                        )}
                                        onChange={(event) => {
                                          updateInsuranceDepositState(
                                            'AccountType',
                                            event.target.value
                                          );
                                        }}
                                      />
                                      <div className="flex">
                                        <MyDropdown
                                          label="Select Account Holder"
                                          name="accountHolder"
                                          id="accountHolder"
                                          required={true}
                                          leftIcon={
                                            <i className="fa-regular fa-user"></i>
                                          }
                                          error={
                                            insuranceDepositState?.Errors
                                              ?.accountHolder
                                          }
                                          value={
                                            insuranceDepositState.accountHolder
                                          }
                                          dropDownData={FamilyAndRelatives?.map(
                                            (obj, index) => {
                                              return {
                                                id: index,
                                                label: obj?.label!,
                                                value: obj?.value!,
                                              };
                                            }
                                          )}
                                          // onChange={handleAccountHolderChange}
                                          onChange={(event) => {
                                            const selected =
                                              FamilyAndRelatives?.find(
                                                (obj) => {
                                                  if (
                                                    parseInt(
                                                      event.target.value
                                                    ) === obj?.value
                                                  )
                                                    return {
                                                      value: obj?.value,
                                                      label: obj?.label,
                                                    };
                                                }
                                              );

                                            // updateSchemeDepositState(
                                            //   'accountHolder',
                                            //   event.target.value
                                            // );
                                            // updateSchemeDepositState(
                                            //   'accountHolderName',
                                            //   selected?.label
                                            // );
                                            checkeligibleHandler(
                                              event.target.value
                                            );
                                            if (
                                              insuranceDepositState?.AccountType ===
                                              '01'
                                            ) {
                                              addAccountsHolderHandler(
                                                event.target.value
                                              );
                                            }
                                            updateOperatorNameHandler(
                                              selected?.value
                                            );
                                          }}
                                        />
                                        {insuranceDepositState?.AccountType ===
                                        '01' ? (
                                          ''
                                        ) : (
                                          <button
                                            onClick={() => {
                                              addAccountsHolderHandler(
                                                insuranceDepositState.accountHolder
                                              );
                                            }}
                                            className="ml-5 w-1/12 rounded border bg-primary font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                                          >
                                            <i className="fa-solid fa-plus"></i>
                                          </button>
                                        )}
                                      </div>
                                      <div>
                                        {insuranceDepositState?.AccountType ===
                                        '01' ? (
                                          ''
                                        ) : (
                                          <div className="rounded border-2 p-3">
                                            <h2 className="p-4 text-center uppercase">
                                              Selected Accounts
                                            </h2>

                                            <div className="">
                                              {selectAccount?.map(
                                                (item: any) => (
                                                  <div className=" m-4 grid grid-cols-1 gap-4 rounded border p-4 lg:grid-cols-1 ">
                                                    <div className="flex">
                                                      <div className="peer form-input mr-2 w-full rounded border">
                                                        {item?.FullName}
                                                      </div>

                                                      <button
                                                        className="ml-5 w-1/6 rounded border bg-primary font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                                                        onClick={() => {
                                                          removeAccountsHandler(
                                                            item.PersonId
                                                          );
                                                        }}
                                                      >
                                                        <i className="fa-solid fa-trash"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <div>
                                          <div className="rounded border-2 p-3">
                                            <h2 className="p-4 text-center uppercase">
                                              Accounts Operator
                                            </h2>

                                            <div className="">
                                              {insuranceDepositState?.AccountType ===
                                              '01' ? (
                                                <div className=" m-4 grid grid-cols-1 gap-4 rounded border p-4 lg:grid-cols-1 ">
                                                  <div className="flex">
                                                    <div className="peer form-input mr-2 w-full rounded border">
                                                      {OperatorName?.Age >= 18
                                                        ? OperatorName.FullName
                                                        : myCardsResponseData?.[0]
                                                            ?.Name!}
                                                    </div>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div>
                                                  {selectAccount?.map(
                                                    (item: any) => (
                                                      <div className=" m-4 grid grid-cols-1 gap-4 rounded border p-4 lg:grid-cols-1 ">
                                                        <div className="flex">
                                                          <div className="peer form-input mr-2 w-full rounded border">
                                                            {item?.Age >= 18
                                                              ? item.FullName
                                                              : myCardsResponseData?.[0]
                                                                  ?.Name!}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* <MyTextInput
                                      label="Account Number"
                                      name="accountNo"
                                      inputType="text"
                                      id="accountNo"
                                      disabled={true}
                                      required={false}
                                      value={selectedAccountHolder?.value}
                                      onChangeHandler={function (
                                        event: ChangeEvent<HTMLInputElement>
                                      ): void {
                                        throw new Error(
                                          'Function not implemented.'
                                        );
                                      }}
                                      leftIcon={
                                        <i className="fa-regular fa-hashtag"></i>
                                      }
                                    /> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {/* step 2 */}
                          {activeStep + 1 === 2 && (
                            <div className="py-10">
                              <div className="flex justify-center">
                                <div className="w-full md:w-1/2">
                                  <div className="grid grid-cols-1 gap-6">
                                    <MyTextInput
                                      label="Account Name"
                                      name="accountHolderName"
                                      inputType="text"
                                      id="AccountName"
                                      value={
                                        insuranceDepositState?.accountHolderName
                                      }
                                      disabled={false}
                                      required={false}
                                      onChangeHandler={(event) => {
                                        updateInsuranceDepositState(
                                          event.target.name,
                                          event.target.value
                                        );
                                      }}
                                      leftIcon={
                                        <i className="fa-solid fa-person"></i>
                                      }
                                    />
                                    <MyDropdown
                                      label="Tenure"
                                      name="tenure"
                                      required={true}
                                      id="tenure"
                                      leftIcon={
                                        <i className="fa-regular fa-calendar"></i>
                                      }
                                      value={insuranceDepositState?.tenure}
                                      error={
                                        insuranceDepositState?.Errors?.tenure
                                      }
                                      dropDownData={getDurationsResponseData?.map(
                                        (obj: any, index: number) => {
                                          return {
                                            id: index,
                                            label:
                                              obj?.DurationName! +
                                              ' ' +
                                              '|' +
                                              ' ' +
                                              obj?.InterestRate +
                                              '%',
                                            value: obj?.DurationId!,
                                          };
                                        }
                                      )}
                                      onChange={handleTenureChange}
                                    />

                                    <MyTextInput
                                      label="Duration In Months"
                                      name="DurationInMonths"
                                      inputType="text"
                                      id="DurationInMonths"
                                      value={
                                        insuranceDepositState?.DurationInMonths
                                      }
                                      disabled={true}
                                      required={false}
                                      onChangeHandler={function (): void {
                                        throw new Error(
                                          'Function not implemented.'
                                        );
                                      }}
                                      leftIcon={
                                        <i className="fa-regular fa-calendar"></i>
                                      }
                                    />
                                    <MyTextInput
                                      label="Amount"
                                      name="amount"
                                      inputType="text"
                                      id="amount"
                                      value={insuranceDepositState?.amount}
                                      error={
                                        insuranceDepositState?.Errors?.amount
                                      }
                                      disabled={false}
                                      required={false}
                                      onChangeHandler={(event) => {
                                        updateInsuranceDepositState(
                                          event.target.name,
                                          event.target.value,
                                          MinimumDepositAmount
                                        );
                                      }}
                                      leftIcon={
                                        <i className="fa-regular fa-bangladeshi-taka-sign"></i>
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {/* step 3 */}
                          {activeStep + 1 === 3 && (
                            <div className="py-10">
                              <div className="flex justify-center">
                                <div className="w-full space-y-6  md:w-1/2">
                                  <div className="grid-col-1 grid gap-4 ">
                                    <div>
                                      <MyDropdown
                                        label="Nominee"
                                        name="nominee"
                                        id="nominee"
                                        leftIcon={
                                          <i className="fa-regular fa-user"></i>
                                        }
                                        required={true}
                                        value={
                                          insuranceDepositState?.selectedNominee
                                        }
                                        error={
                                          insuranceDepositState?.Errors
                                            ?.selectedNomineeName
                                        }
                                        dropDownData={PersonFamilyAndRelatives?.map(
                                          (obj: any, index: number) => {
                                            return {
                                              id: index,
                                              label: obj?.label!,
                                              value: obj?.value!,
                                            };
                                          }
                                        )}
                                        onChange={(event) => {
                                          const selected =
                                            PersonFamilyAndRelatives?.find(
                                              (obj: any) => {
                                                if (
                                                  parseInt(
                                                    event.target.value
                                                  ) === obj?.value
                                                )
                                                  return {
                                                    value: obj?.value,
                                                    label: obj?.label,
                                                  };
                                              }
                                            );
                                          updateInsuranceDepositState(
                                            'selectedNominee',
                                            event.target.value
                                          );

                                          updateInsuranceDepositState(
                                            'selectedNomineeName',
                                            selected?.label
                                          );
                                          updatePersonId(event.target.value);

                                          if (
                                            insuranceDepositState.AccountType ===
                                            '01'
                                          ) {
                                            nomineeAddHandler(
                                              PersonFamilyAndRelatives
                                            );
                                          } else {
                                            return '';
                                          }
                                        }}
                                      />
                                    </div>
                                    <div className="flex">
                                      <MyTextInput
                                        label="Nominee Percentage"
                                        name="nomineePercentage"
                                        inputType="text"
                                        id="nomineePercentage"
                                        disabled={
                                          insuranceDepositState.AccountType ===
                                          '01'
                                            ? true
                                            : false
                                        }
                                        required={false}
                                        value={
                                          insuranceDepositState.nomineePercentage
                                        }
                                        error={
                                          nomineePercentage === ''
                                            ? insuranceDepositState?.Errors
                                                ?.nomineePercentage
                                            : nomineePercentage
                                        }
                                        onChangeHandler={(event) => {
                                          updateInsuranceDepositState(
                                            event.target.name,
                                            event.target.value
                                          );
                                          setNomineePercentage('');
                                        }}
                                        leftIcon={
                                          <i className="fa-solid fa-percent"></i>
                                        }
                                      />
                                      {insuranceDepositState.AccountType ===
                                      '01' ? (
                                        ''
                                      ) : (
                                        <button
                                          className="ml-5 w-1/6 rounded border bg-primary font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                                          onClick={() => {
                                            let error = '';
                                            const {
                                              selectedNomineeName,
                                              nomineePercentage,
                                            } = insuranceDepositState;

                                            // Calculate the total nomineePercentage
                                            const totalPercentage =
                                              insuranceDepositState.JointNominee.reduce(
                                                (total: any, nominee: any) =>
                                                  total +
                                                  parseInt(
                                                    nominee.nomineePercentage,
                                                    10
                                                  ),
                                                0
                                              );

                                            // Check if the total percentage exceeds 100
                                            if (
                                              totalPercentage +
                                                parseInt(
                                                  nomineePercentage,
                                                  10
                                                ) >
                                              100
                                            ) {
                                              setNomineePercentage(
                                                'Total nominee percentage cannot exceed 100%'
                                              );
                                            } else {
                                              // Validate and update errors
                                              const cardFields = {
                                                selectedNomineeName,
                                                nomineePercentage,
                                              };

                                              let fieldName: keyof typeof cardFields;

                                              for (fieldName in cardFields) {
                                                updateInsuranceDepositState(
                                                  fieldName,
                                                  cardFields[fieldName]
                                                );
                                                error +=
                                                  validateInsuranceDepositState(
                                                    fieldName,
                                                    insuranceDepositState[
                                                      fieldName
                                                    ]
                                                  ) || '';
                                              }

                                              // Display error or proceed with adding nominee
                                              if (error.length === 0) {
                                                nomineeAddHandler(
                                                  PersonFamilyAndRelatives
                                                );
                                              } else {
                                                // Display the error, you can handle this according to your UI
                                              }
                                            }
                                          }}
                                        >
                                          <i className="fa-solid fa-plus"></i>
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                  {insuranceDepositState.AccountType ===
                                  '01' ? (
                                    ''
                                  ) : (
                                    <div className="rounded border-2 p-3">
                                      <h2 className="p-4 text-center uppercase">
                                        Appointed Nominee
                                      </h2>
                                      <span className="flex justify-center text-sm text-error">
                                        {
                                          insuranceDepositState?.Errors
                                            ?.JointNominee
                                        }
                                      </span>
                                      <div className="">
                                        {insuranceDepositState?.JointNominee?.map(
                                          (item: any) => (
                                            <div className=" m-4 grid grid-cols-1 gap-4 rounded border p-4 lg:grid-cols-1 ">
                                              <div className="peer form-input mr-2 w-full rounded border">
                                                {item?.selectedNomineeName}(
                                                {item?.PersonId})
                                              </div>

                                              <div className="flex">
                                                <MyTextInput
                                                  label="Nominee"
                                                  name="nominee"
                                                  inputType="text"
                                                  id="nominee"
                                                  disabled={true}
                                                  required={false}
                                                  value={
                                                    item?.NomineePercentage
                                                  }
                                                  onChangeHandler={() => {}}
                                                  leftIcon={
                                                    <i className="fa-solid fa-percent"></i>
                                                  }
                                                />

                                                <button
                                                  className="ml-5 w-1/6 rounded border bg-primary font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                                                  onClick={() => {
                                                    removeNomineeHandler(
                                                      item.id
                                                    );
                                                  }}
                                                >
                                                  <i className="fa-solid fa-trash"></i>
                                                </button>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {/* step 4 */}
                          {activeStep + 1 === 4 && (
                            <div className="py-10">
                              <div className="flex justify-center">
                                <div className="w-full md:w-1/2">
                                  <div className="grid grid-cols-1 gap-6">
                                    <ul className="mt-6 divide-y overflow-hidden rounded border text-justify">
                                      <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                        <div className="w-full text-left md:w-1/2">
                                          Account Name
                                        </div>
                                        <div className="w-full text-right md:w-1/2">
                                          {productName}
                                        </div>
                                      </li>

                                      <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                        <div className="w-full text-left md:w-1/2">
                                          Tenure
                                        </div>
                                        <div className="w-full text-right md:w-1/2">
                                          {insuranceDepositState?.tenure}
                                        </div>
                                      </li>
                                      {/* <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                      <div className="w-full text-left md:w-1/2">
                                        Interest Rate
                                      </div>
                                      <div className="w-full text-right md:w-1/2">
                                        {schemeDepositState?.Interest}%
                                      </div>
                                    </li> */}
                                      <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                        <div className="w-full text-left md:w-1/2">
                                          Deposit Amount
                                        </div>
                                        <div className="w-full text-right md:w-1/2">
                                          {insuranceDepositState?.amount} Tk
                                        </div>
                                      </li>
                                      <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                        <div className="w-full text-left md:w-1/2">
                                          Account Holder
                                        </div>
                                        <div className="w-full text-right md:w-1/2">
                                          {
                                            insuranceDepositState?.accountHolderName
                                          }
                                        </div>
                                      </li>
                                      {insuranceDepositState?.AccountType ===
                                      '01' ? (
                                        <>
                                          <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                            <div className="w-full text-left md:w-1/2">
                                              Nominee Name
                                            </div>
                                            <div className="w-full text-right md:w-1/2">
                                              {
                                                insuranceDepositState?.selectedNomineeName
                                              }
                                            </div>
                                          </li>
                                          <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                            <div className="w-full text-left md:w-1/2">
                                              Nominee Percentage
                                            </div>
                                            <div className="w-full text-right md:w-1/2">
                                              {
                                                insuranceDepositState?.nomineePercentage
                                              }{' '}
                                              %
                                            </div>
                                          </li>
                                        </>
                                      ) : (
                                        ''
                                      )}
                                    </ul>
                                  </div>
                                  {insuranceDepositState?.AccountType ===
                                  '01' ? (
                                    ''
                                  ) : (
                                    <div>
                                      <div className="rounded border-2 p-3">
                                        <h2 className="p-4 text-center uppercase">
                                          Appointed Nominee
                                        </h2>
                                        <div className="">
                                          {insuranceDepositState?.JointNominee?.map(
                                            (item: any) => (
                                              <div className=" m-4 grid grid-cols-1 gap-4 md:grid-cols-2 ">
                                                <div className="peer form-input mr-2 w-full rounded border">
                                                  {item?.label}({item?.value})
                                                </div>

                                                <div className="flex">
                                                  <MyTextInput
                                                    label="Interest"
                                                    name="Interest"
                                                    inputType="text"
                                                    id="Interest"
                                                    disabled={true}
                                                    required={false}
                                                    value={
                                                      item?.nomineePercentage
                                                    }
                                                    onChangeHandler={function (): void {
                                                      throw new Error(
                                                        'Function not implemented.'
                                                      );
                                                    }}
                                                    leftIcon={
                                                      <i className="fa-solid fa-percent"></i>
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {activeStep + 1 === 5 && (
                            <div className="py-10">
                              <div className="flex justify-center">
                                <div className="w-full md:w-1/2">
                                  <div className="grid grid-cols-1 gap-6">
                                    <CardAccountPinView
                                      showAccountInfo={true}
                                      titleAccounts="Transfer From"
                                      showCardInfo={true}
                                      myCards={myCardsResponseData}
                                      parentPageState={insuranceDepositState}
                                      updateParentPageState={
                                        updateInsuranceDepositState
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex w-full items-center justify-center gap-4 p-6">
                          <MyButton
                            onClick={() => {
                              handleBack();
                            }}
                            type="button"
                            disabled={activeStep === 0 ? true : false}
                            label="Back"
                            styleClass="w-2/4 md:w-1/4 rounded border bg-primary p-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                            name={''}
                            id="handleBack"
                          />

                          <MyButton
                            onClick={() => {
                              var error = '';

                              if (activeStep === 0) {
                                const { accountHolder } = insuranceDepositState;

                                const cardFields = {
                                  accountHolder,
                                };
                                let fieldName: keyof typeof cardFields;

                                for (fieldName in cardFields) {
                                  updateInsuranceDepositState(
                                    fieldName,
                                    cardFields[fieldName]
                                  );
                                  error =
                                    error +
                                    validateInsuranceDepositState(
                                      fieldName,
                                      insuranceDepositState[fieldName]
                                    );
                                }
                                if (error.length === 0) {
                                  if (
                                    accountOpeningEligibilityResponseData?.[0]
                                      ?.IsEligible
                                  ) {
                                    if (
                                      insuranceDepositState?.AccountType !==
                                        '01' &&
                                      selectAccount?.length === 0
                                    ) {
                                      return '';
                                    } else {
                                      handleNext();
                                    }
                                  } else {
                                    return '';
                                  }
                                }
                              }
                              if (activeStep === 1) {
                                const { tenure, amount } =
                                  insuranceDepositState;
                                const cardFields = {
                                  tenure,
                                  amount,
                                };

                                let fieldName: keyof typeof cardFields;

                                for (fieldName in cardFields) {
                                  updateInsuranceDepositState(
                                    fieldName,
                                    cardFields[fieldName]
                                  );
                                  error =
                                    error +
                                      validateInsuranceDepositState(
                                        fieldName,
                                        insuranceDepositState[fieldName],
                                        MinimumDepositAmount
                                      ) || '';
                                }
                                if (error.length === 0) {
                                  nomineeStateUpdateHandler();
                                  handleNext();
                                }
                              }
                              if (activeStep === 2) {
                                const {
                                  selectedNomineeName,
                                  nomineePercentage,
                                  selectedNominee,
                                } = insuranceDepositState;
                                const cardFields = {
                                  selectedNomineeName,
                                  nomineePercentage,
                                  selectedNominee,
                                };

                                let fieldName: keyof typeof cardFields;

                                for (fieldName in cardFields) {
                                  updateInsuranceDepositState(
                                    fieldName,
                                    cardFields[fieldName]
                                  );
                                  error =
                                    error +
                                    validateInsuranceDepositState(
                                      fieldName,
                                      insuranceDepositState[fieldName]
                                    );
                                }
                                if (error.length === 0) {
                                  handleNext();
                                  setNomineePercentage('');
                                }
                              }
                              if (activeStep === 3) {
                                handleNext();
                              }
                              if (activeStep === steps.length - 1) {
                                const { CardAccount, CardNo, CardPIN } =
                                  insuranceDepositState;
                                const cardFields = {
                                  CardAccount,
                                  CardNo,
                                  CardPIN,
                                };

                                let fieldName: keyof typeof cardFields;
                                for (fieldName in cardFields) {
                                  updateInsuranceDepositState(
                                    fieldName,
                                    cardFields[fieldName]
                                  );
                                  error =
                                    error +
                                    validateInsuranceDepositState(
                                      fieldName,
                                      insuranceDepositState[fieldName]
                                    );
                                }
                                if (error.length === 0) {
                                  if (cardPinRemainingTry === 0) {
                                    cardLockRequestHandler();
                                  } else {
                                    verifySchemeDepositPinRequestHandler();
                                  }
                                }
                              }
                            }}
                            type="button"
                            label={
                              activeStep === steps.length - 1
                                ? 'Verify'
                                : 'Next'
                            }
                            styleClass="w-2/4 md:w-1/4 rounded border bg-primary p-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                            name={''}
                            disabled={false}
                            id="nomineeState"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default InsuranceDeposit;
