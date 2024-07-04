// @ts-nocheck
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import CardPage from 'authenticated_pages/info/financial_card/CardPage';
import { CardModel } from 'authenticated_pages/info/financial_card/model/data/CardModel';
import CardAccountPinView from 'authenticated_pages/shared/components/CardAccountPinView';
import { CollectionLedgersResponseModel } from 'authenticated_pages/shared/model/data/CollectionLedgersResponseModel';
import { DCBankModel } from 'authenticated_pages/shared/model/data/DCBankModel';
import { GetPolicyRequestModel } from 'authenticated_pages/shared/model/request/GetPolicyRequestModel';
import { stepStyle } from 'authenticated_pages/shared/style/stepperStyle';
import OTPValidationView from 'authentication/otp_validation/OTPValidationView';
import CryptoJS from 'crypto-js';
import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import MyButton from 'global_shared/components/MyButton';
import MyDropdown from 'global_shared/components/MyDropdown';
import MyImageInput from 'global_shared/components/MyImageInput';
import MyTextInput from 'global_shared/components/MyTextInput';
import FailedDialogue from 'global_shared/components/dialogues/FailedDialogue';
import LoaderDialogue from 'global_shared/components/dialogues/LoaderDialogue';
import SuccessDialogue from 'global_shared/components/dialogues/SuccessDialogue';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import useCardPinRemainingTry from 'global_shared/hooks/useCardPinRemainingTry';
import useCommand from 'global_shared/hooks/useCommand';
import { CardHandler } from 'global_shared/model/data/CardHandler';
import { CombinedCardModel } from 'global_shared/model/data/CombinedCardModel';
import { TermsAndConditionModel } from 'global_shared/model/data/TermsAndConditionModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';
import moment from 'moment';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CardLockRequestModel } from 'authenticated_pages/shared/model/request/CardLockRequestModel';
import { Size } from 'global_shared/enum/Size';
import useDepositThroughBankRequestState from './hook/useDepositThroughBankRequestState';
import { DepositThroughBankRequestModel } from './model/request/DepositThroughBankRequestModel';
import { validateDepositThroughBankRequestState } from './validation/validateDepositThroughBankRequestState';

import Notes from '../shared/components/Notes';

import { CollectionAccountListRequestModel } from 'authenticated_pages/deposits/deposit_later/model/request/CollectionAccountListRequestModel';
import MyTextarea from 'global_shared/components/MyTextarea';
import TransferCollectionLedgerAccountsView from '../shared/components/TransferCollectionLedgerAccountsView';
import { TransferCollectionLedgerModel } from '../shared/data/TransferCollectionLedgerModel';
import useCollectionLedgerState, {
  CollectionLedgerState,
} from '../shared/hooks/useCollectionLedgerState';
import { validateCollectionLedgerState } from '../shared/validation/validateCollectionLedgerState';
import { getCollectionLegerTotalAmount } from 'global_shared/utils/textUtils';

/**========================================================================
 * ?                                ABOUT
 * @author         :  name_on_card
 * @designation    :  Software Developer
 * @email          :  newtonmitro@gmail.com
 * @description    :
 * @createdOn      :  01 July 2023
 * @updatedBy      :  Sunit Corneleous
 * @updatedOn      :  23 August 2023
 *========================================================================**/

const steps = [
  // 'DEPOSIT FOR',
  'BANK TRANSACTION INFORMATION',
  'ACCOUNTS TO DEPOSIT',
  'PREVIEW',
  'TRANSFER FROM',
];

function DepositThroughBankPage() {
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const notify = () => toast('Please, select accounts to deposit.');
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

  const { cardPinRemainingTry, updateCardPinRemainingTry } =
    useCardPinRemainingTry();

  const {
    depositThroughBankRequestState,
    updateDepositThroughBankRequestState,
  } = useDepositThroughBankRequestState();

  const {
    collectionLedgerState,
    initCollectionLedgerState,
    updateCollectionLedgerState,
    setCollectionLedgerState,
  } = useCollectionLedgerState();

  const {
    loading: getBankInformationResponseDataLoading,
    data: getBankInformationResponseData,
    executeCommand: bankInformationRequestExecuteCommand,
  } = useCommand<DCBankModel[] | null>();

  const {
    loading: verifyPINResponseDataLoading,
    data: verifyPINResponseData,
    message: submitVerifyPinResponseMessage,
    status: verifyPinResponseStatus,
    setStatus: setVerifyPinResponseStatus,
    executeCommand: verifyPINRequestExecutedCommand,
  } = useCommand<any>();

  const {
    loading: depositThroughBankResponseDataLoading,
    data: depositThroughBankResponseData,
    message: depositThroughBankResponseMessage,
    setMessage: setDepositThroughBankResponseMessage,
    status: depositThroughBankResponseStatus,
    setStatus: setDepositThroughBankResponseStatus,
    executeCommand: depositThroughBankRequestCommand,
  } = useCommand<string | null>();

  const {
    loading: collectionAccountsResponseDataLoading,
    data: collectionAccountsResponseData,
    message: collectionAccountsResponseMessage,
    status: collectionAccountsResponseStatus,
    setStatus: setCollectionAccountsResponseStatus,
    executeCommand: collectionAccountsRequestExecuteCommand,
  } = useCommand<CollectionLedgersResponseModel | null>();

  const {
    loading: cardLockResponseDataLoading,
    data: cardLockResponseData,
    status: cardLockResponseStatus,
    setStatus: setCardLockResponseStatus,
    executeCommand: cardLockRequestExecuteCommand,
  } = useCommand<string | null>();

  const {
    loading: myCardsResponseDataLoading,
    data: myCardsResponseData,
    executeCommand: myCardsRequestCommand,
  } = useCommand<CardModel[] | null>();

  const {
    loading: getMfsPolicyResponseDataLoading,
    data: getMfsPolicyResponseData,
    executeCommand: getMfsPolicyRequestExecuteCommand,
  } = useCommand<TermsAndConditionModel | null>();
  var card: CombinedCardModel | null = null;
  if (myCardsResponseData !== null) {
    const cardHandler = new CardHandler(myCardsResponseData);
    card = cardHandler.getHandledCard()[0];
  }
  useEffect(() => {
    var baseRequestObj = new BaseRequestModel(authUser);

    bankInformationRequestExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/deposits_V1/getDcBankAccounts',
      JSON.stringify(baseRequestObj),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );

    // 2nd useeffect start
    if (myCardsResponseData != null) {
      var sortedAccount = myCardsResponseData?.[0]?.CardsAccounts;
      sortedAccount.sort((obj1, obj2) =>
        obj1?.AccountNo?.trim() > obj2?.AccountNo?.trim()
          ? 1
          : obj1?.AccountNo?.trim() < obj2?.AccountNo?.trim()
          ? -1
          : 0
      );

      initCollectionLedgerState(sortedAccount);
    }

    const getPolicyRequestModel = new GetPolicyRequestModel(authUser);
    getPolicyRequestModel.ApplicationName = 'MFS';
    getPolicyRequestModel.ContentName = 'Bank Notes';
    getPolicyRequestModel.Application = 'PassBook';

    getMfsPolicyRequestExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/others_v1/GetMfsPolicy',
      JSON.stringify(getPolicyRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    // 4nd useeffect end
  }, [collectionAccountsResponseData, cardLockResponseData]);

  const getSelectedCollectionLedgers = (
    collectionLedgers: TransferCollectionLedgerModel[]
  ) => {
    var checkedAccounts: TransferCollectionLedgerModel[] = [];
    collectionLedgers.forEach((element) => {
      if (element?.isSelected) {
        checkedAccounts.push(element);
      }
    });

    return checkedAccounts;
  };

  useEffect(() => {
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
    if (myCardsResponseData !== null) {
      updateDepositThroughBankRequestState(
        'CardNo',
        myCardsResponseData?.[0].CardNo?.trim()
      );
      updateDepositThroughBankRequestState(
        'CardAccount',
        myCardsResponseData?.[0].CardsAccounts?.[0].AccountNumber.trim()
      );
    }

    const collectionAccountListRequestModel =
      new CollectionAccountListRequestModel(authUser);
    collectionAccountListRequestModel.SearchText = card?.AccountNumber;
    if (card?.AccountNumber) {
      collectionAccountsRequestExecuteCommand(
        process.env.REACT_APP_BASE_URL + '/deposits_V1/getCollectionAccount',
        JSON.stringify(collectionAccountListRequestModel),
        {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
        }
      );
    }

    // setAccountNumber();
  }, [card?.AccountNumber]);

  const totalAmount = getCollectionLegerTotalAmount(collectionLedgerState);

  // var totalAmount = 0;
  // if (collectionLedgerState.length > 0) {
  //   collectionLedgerState.forEach((collectionLedger, index) => {
  //     if (collectionLedger?.isSelected) {
  //       totalAmount = totalAmount + collectionLedger.Amount;
  //     }
  //   });
  // }

  const TransactionModelMap = (
    collectionLedgerState: CollectionLedgerState[]
  ) => {
    let TransferCollectionLedgerNewArray: TransferCollectionLedgerModel[] = [];
    collectionLedgerState.forEach((element) => {
      const transferCollectionLedgerModel = new TransferCollectionLedgerModel();
      transferCollectionLedgerModel.AccountId = element.AccountId;
      transferCollectionLedgerModel.AccountNumber = element.AccountNumber;
      transferCollectionLedgerModel.AccountTypeCode = element.AccountTypeCode;
      transferCollectionLedgerModel.AccountTypeName = element.AccountTypeName;
      transferCollectionLedgerModel.AccountType = element.AccountTypeName;
      transferCollectionLedgerModel.Amount = element.Amount;
      transferCollectionLedgerModel.Balance = element.Balance;
      transferCollectionLedgerModel.DCAccountNo = element.DCAccountNo;
      transferCollectionLedgerModel.LedgerId = element.LedgerId;
      transferCollectionLedgerModel.PlType = element.PlType;
      transferCollectionLedgerModel.UserId = element.UserId;
      transferCollectionLedgerModel.WithdrawableBalance =
        element.WithdrawableBalance;
      transferCollectionLedgerModel.isSelected = element.isSelected;
      TransferCollectionLedgerNewArray.push(transferCollectionLedgerModel);
    });

    return getSelectedCollectionLedgers(TransferCollectionLedgerNewArray);
  };

  const verifyPINRequestHandler = () => {
    const depositThroughBankRequestModel = new DepositThroughBankRequestModel(
      authUser
    );

    var encryptPassword = CryptoJS.MD5(depositThroughBankRequestState?.CardPIN);
    depositThroughBankRequestModel.AccountHolderName =
      collectionAccountsResponseData?.AccountHolderInfo[0]?.FullName!;
    depositThroughBankRequestModel.AccountId = card?.AccountId!;
    depositThroughBankRequestModel.AccountType =
      depositThroughBankRequestState?.BankAccountNumber;
    depositThroughBankRequestModel.AccountNo = card?.AccountNumber!;
    depositThroughBankRequestModel.FromAccountNo =
      depositThroughBankRequestState?.BankAccountNumber;
    depositThroughBankRequestModel.TransactionType = 'DepositRequest';
    depositThroughBankRequestModel.DepositDate = moment(
      new Date(depositThroughBankRequestState?.DepositDate)
    ).format();

    // depositThroughBankRequestModel.ScheduleDate = moment(new Date()).format();
    depositThroughBankRequestModel.EffectiveDay = 0;
    depositThroughBankRequestModel.LedgerId = card?.LedgerId!;
    depositThroughBankRequestModel.RepeatMonths = 0;
    depositThroughBankRequestModel.ReferenceAccountNo =
      depositThroughBankRequestState?.BankAccountNumber;

    depositThroughBankRequestModel.TransactionNumber =
      depositThroughBankRequestState?.TransactionNumber;
    depositThroughBankRequestModel.bankRoutingNumber =
      depositThroughBankRequestState?.BankRoutingNumber;
    depositThroughBankRequestModel.TransactionReceipt =
      depositThroughBankRequestState?.TransactionReceipt;
    depositThroughBankRequestModel.TotalAmount =
      depositThroughBankRequestState?.SentAmount;

    depositThroughBankRequestModel.TotalDepositAmount = totalAmount;
    depositThroughBankRequestModel.Remarks =
      depositThroughBankRequestState?.Remarks;
    depositThroughBankRequestModel.TransactionMethod = '12';
    depositThroughBankRequestModel.TransactionModels = TransactionModelMap(
      collectionLedgerState
    );
    depositThroughBankRequestModel.CardNo = myCardsResponseData?.[0]?.CardNo!;
    depositThroughBankRequestModel.SecretKey = encryptPassword.toString();
    depositThroughBankRequestModel.NameOnCard = myCardsResponseData?.[0].Name!;

    verifyPINRequestExecutedCommand(
      process.env.REACT_APP_BASE_URL + '/cards_V1/verifyCardPIN',
      JSON.stringify(depositThroughBankRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };

  const submitCollectionLedgerAccountsSubmit = () => {
    var error = '';
    let fieldName: keyof typeof depositThroughBankRequestState;
    var isAllLedgerAccountChecked = false;
    for (fieldName in depositThroughBankRequestState) {
      updateDepositThroughBankRequestState(
        fieldName,
        depositThroughBankRequestState[fieldName]
      );

      error =
        error +
        validateDepositThroughBankRequestState(
          fieldName,
          depositThroughBankRequestState[fieldName]
        );
    }

    collectionLedgerState?.forEach((element) => {
      if (element?.isSelected) {
        isAllLedgerAccountChecked = true;
      }
    });

    if (isAllLedgerAccountChecked) {
    } else {
      notify();
    }

    if (error.length === 0) {
      verifyPINRequestHandler();
    }
  };
  useEffect(() => {
    if (activeStep + 1 !== 6) {
      updateDepositThroughBankRequestState('CardPIN', '');
    }
  }, [activeStep]);
  const bankDepositRequestHandler = (otpData: string) => {
    verifyPINResponseData.OTPValue = otpData;

    depositThroughBankRequestCommand(
      process.env.REACT_APP_BASE_URL + '/deposits_V2/submitDepositLater',
      JSON.stringify(verifyPINResponseData),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };

  const getBankByName = (bankName: string) => {
    const bankInfo = getBankInformationResponseData?.filter((element) => {
      return element?.BankName === bankName;
    });

    return bankInfo?.[0];
  };

  const bankOtherInfoHandler = (bankName: string) => {
    const bankInfo = getBankByName(bankName);
    updateDepositThroughBankRequestState('BankName', bankName);
    updateDepositThroughBankRequestState(
      'BankAccountNumber',
      bankInfo?.BankAccNumber
    );
    updateDepositThroughBankRequestState(
      'BankRoutingNumber',
      bankInfo?.BankRoutingNo
    );
  };

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const hasSelectedAccounts = collectionLedgerState?.filter((item) => {
    if (item.isSelected) {
      return true;
    } else {
      return false;
    }
  });

  if (myCardsResponseData?.length === 0) {
    return <CardPage />;
  } else {
    return (
      <>
        <LoaderDialogue
          isLoading={
            verifyPINResponseDataLoading ||
            myCardsResponseDataLoading ||
            cardLockResponseDataLoading ||
            collectionAccountsResponseDataLoading ||
            depositThroughBankResponseDataLoading ||
            getBankInformationResponseDataLoading ||
            getMfsPolicyResponseDataLoading
          }
        />

        <FailedDialogue
          dialogueSize={Size.Small}
          isDialogueOpen={
            collectionAccountsResponseStatus === 'failed' ? true : false
          }
          cancelButtonText="ok"
          onCloseButtonClick={() => {
            setCollectionAccountsResponseStatus(null);
          }}
        >
          {collectionAccountsResponseMessage}
        </FailedDialogue>

        {submitVerifyPinResponseMessage?.includes('Invalid Card PIN') && (
          <FailedDialogue
            dialogueSize={Size.Small}
            isDialogueOpen={verifyPinResponseStatus === 'failed' ? true : false}
            cancelButtonText="ok"
            onCloseButtonClick={() => {
              setVerifyPinResponseStatus(null);
              cardLockRequestHandler();
            }}
          >
            {submitVerifyPinResponseMessage +
              'Remaining Tries' +
              cardPinRemainingTry}
          </FailedDialogue>
        )}

        {verifyPinResponseStatus === 'success' && (
          <OTPValidationView
            isOTPValidationViewOpen={
              verifyPinResponseStatus === 'success' ? true : false
            }
            closeOTPValidationView={() => {
              setVerifyPinResponseStatus(null);
            }}
            otpValidateRequestHandler={bankDepositRequestHandler}
            resendOTPRequestHandler={verifyPINRequestHandler}
          />
        )}

        <SuccessDialogue
          isDialogueOpen={cardLockResponseStatus === 'success' ? true : false}
          onOkButtonClick={() => {
            setCardLockResponseStatus(null);
          }}
        >
          {cardLockResponseData}
        </SuccessDialogue>

        <SuccessDialogue
          isDialogueOpen={
            depositThroughBankResponseStatus === 'success' ? true : false
          }
          onCloseButtonClick={() => {
            setDepositThroughBankResponseStatus(null);
            navigate('');
          }}
        >
          {depositThroughBankResponseData}
        </SuccessDialogue>

        <FailedDialogue
          dialogueSize={Size.Small}
          isDialogueOpen={
            depositThroughBankResponseStatus === 'failed' ? true : false
          }
          OkButtonText="Retry"
          onOkButtonClick={() => {
            setDepositThroughBankResponseStatus(null);
          }}
          cancelButtonText="Back"
          onCloseButtonClick={() => {
            navigate('');
          }}
        >
          {depositThroughBankResponseMessage}
        </FailedDialogue>

        <FailedDialogue
          dialogueSize={Size.Small}
          isDialogueOpen={
            collectionAccountsResponseStatus === 'failed' ? true : false
          }
          cancelButtonText="ok"
          onCloseButtonClick={() => {
            setCollectionAccountsResponseStatus(null);
          }}
        >
          {collectionAccountsResponseMessage}
        </FailedDialogue>

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
                      className="flex w-full flex-col gap-6 lg:w-4/12"
                    >
                      <motion.div
                        variants={MyVariants.SlideInFromRight}
                        transition={MyTransition.Spring.Low}
                      >
                        <Notes
                          data={{
                            __html: getMfsPolicyResponseData?.BanglaContent!,
                          }}
                        />
                      </motion.div>
                      <motion.div
                        variants={MyVariants.SlideInFromLeft}
                        transition={MyTransition.Spring.Low}
                      ></motion.div>
                    </motion.div>

                    <motion.div
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="w-full space-y-6 lg:w-8/12"
                    >
                      <div className="rounded-md bg-surface  shadow">
                        <div className="p-7">
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
                        </div>

                        {activeStep + 1 === 1 && (
                          <motion.div
                            variants={MyVariants.SlideInFromRight}
                            transition={MyTransition.Spring.Low}
                            className="rounded-md bg-surface p-7 "
                          >
                            <ul className="overflow-hidden text-justify">
                              <li className="w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant md:flex">
                                <MyDropdown
                                  label="Select Bank Name"
                                  name="BankName"
                                  id="BankNameId"
                                  required={true}
                                  disabled={false}
                                  value={
                                    depositThroughBankRequestState?.BankName
                                  }
                                  error={
                                    depositThroughBankRequestState?.Errors
                                      ?.BankName
                                  }
                                  dropDownData={getBankInformationResponseData?.map(
                                    (obj, index) => {
                                      return {
                                        id: index,
                                        value: obj?.BankName,
                                        label: obj?.BankName,
                                      };
                                    }
                                  )}
                                  onChange={(event) => {
                                    bankOtherInfoHandler(event.target.value);
                                  }}
                                  leftIcon={
                                    <i className="fa-solid fa-building-columns"></i>
                                  }
                                />
                              </li>
                              <li className="w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant md:flex">
                                <MyTextInput
                                  label="Bank Account Number"
                                  name="BankAccountNumber"
                                  inputType="number"
                                  disabled={true}
                                  required={false}
                                  id="BankAccountNumber"
                                  error={
                                    depositThroughBankRequestState?.Errors
                                      ?.BankAccountNumber
                                  }
                                  value={
                                    depositThroughBankRequestState?.BankAccountNumber
                                  }
                                  leftIcon={
                                    <i className="fa-solid fa-building-columns"></i>
                                  }
                                  onChangeHandler={function (
                                    event: ChangeEvent<HTMLInputElement>
                                  ): void {
                                    throw new Error(
                                      'Function not implemented.'
                                    );
                                  }}
                                />
                              </li>
                              <li className="w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant md:flex">
                                <MyTextInput
                                  label="Bank Routing Number"
                                  name="BankRoutingNumber"
                                  id="BankRoutingNumber"
                                  inputType="number"
                                  disabled={true}
                                  required={false}
                                  value={
                                    depositThroughBankRequestState?.BankRoutingNumber
                                  }
                                  error={
                                    depositThroughBankRequestState?.Errors
                                      ?.BankRoutingNumber
                                  }
                                  leftIcon={
                                    <i className="fa-solid fa-building-columns"></i>
                                  }
                                  onChangeHandler={function (
                                    event: ChangeEvent<HTMLInputElement>
                                  ): void {
                                    throw new Error(
                                      'Function not implemented.'
                                    );
                                  }}
                                />
                              </li>
                              <li className="w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant md:flex">
                                <MyTextInput
                                  label="Transaction Id/Receipt No"
                                  name="TransactionNumber"
                                  inputType="text"
                                  disabled={false}
                                  required={true}
                                  id="TransactionNumber"
                                  value={
                                    depositThroughBankRequestState?.TransactionNumber
                                  }
                                  error={
                                    depositThroughBankRequestState?.Errors
                                      ?.TransactionNumber
                                  }
                                  onChangeHandler={(event) => {
                                    updateDepositThroughBankRequestState(
                                      event.target.name,
                                      event.target.value
                                    );
                                  }}
                                  leftIcon={
                                    <i className="fa-solid fa-money-bill-transfer"></i>
                                  }
                                />
                              </li>
                              <li className="w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant md:flex">
                                <MyTextInput
                                  label="Amount"
                                  name="SentAmount"
                                  inputType="number"
                                  disabled={false}
                                  required={true}
                                  id="SentAmount"
                                  value={depositThroughBankRequestState?.SentAmount.toString()}
                                  error={
                                    depositThroughBankRequestState?.Errors
                                      ?.SentAmount
                                  }
                                  onChangeHandler={(event) => {
                                    updateDepositThroughBankRequestState(
                                      event.target.name,
                                      parseInt(event.target.value),
                                      totalAmount
                                    );
                                  }}
                                  leftIcon={
                                    <i className="fa-solid fa-bangladeshi-taka-sign"></i>
                                  }
                                />
                              </li>
                              <div className="mt-3 bg-backgroundVariant">
                                <MyImageInput
                                  disabled={false}
                                  id="TransactionReceipt"
                                  label="Attach Bank Receipt"
                                  name="TransactionReceipt"
                                  value={
                                    depositThroughBankRequestState?.TransactionReceipt
                                  }
                                  required={true}
                                  error={
                                    depositThroughBankRequestState.Errors
                                      .TransactionReceipt
                                  }
                                  heightClass="h-32"
                                  onChangeHandler={(fieldName, fieldValue) => {
                                    updateDepositThroughBankRequestState(
                                      fieldName,
                                      fieldValue
                                    );
                                  }}
                                />
                              </div>
                              <div className="mt-6">
                                <li className="mt-3 bg-backgroundVariant">
                                  <MyTextarea
                                    label="Remarks"
                                    name="Remarks"
                                    id="Remarks"
                                    rows={4}
                                    cols={0}
                                    disabled={false}
                                    value={
                                      depositThroughBankRequestState?.Remarks
                                    }
                                    required={true}
                                    error={
                                      depositThroughBankRequestState?.Errors
                                        ?.Remarks
                                    }
                                    onChange={(event) => {
                                      updateDepositThroughBankRequestState(
                                        event.target.name,
                                        event.target.value
                                      );
                                    }}
                                  />
                                </li>
                              </div>
                            </ul>
                          </motion.div>
                        )}

                        {activeStep + 1 === 2 && (
                          <div className="p-3">
                            <TransferCollectionLedgerAccountsView
                              collectionLedgerState={collectionLedgerState}
                              updateCollectionLedgerState={
                                updateCollectionLedgerState
                              }
                              setCollectionLedgerState={
                                setCollectionLedgerState
                              }
                              sectionTitle={'Accounts to Deposit'}
                              submitCollectionLedgerAccountsSubmit={
                                submitCollectionLedgerAccountsSubmit
                              }
                              cardAccountWithdrawableBalance={999999999999990}
                              cardLockRequestHandler={() => {}}
                              cardPinRemainingTry={3}
                              depositThroughBankRequestState={
                                depositThroughBankRequestState
                              }
                            />
                          </div>
                        )}

                        {activeStep + 1 === 3 && (
                          <motion.div
                            variants={MyVariants.SlideInFromRight}
                            transition={MyTransition.Spring.Low}
                          >
                            <div className="p-7">
                              <h2 className="pb-4 text-center text-lg font-semibold">
                                Transfer Form
                              </h2>
                              <div className="border p-2">
                                <ul className="divide-y overflow-hidden rounded  text-justify">
                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Bank Name
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      {depositThroughBankRequestState?.BankName}
                                    </div>
                                  </li>
                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Bank Account Number
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      {
                                        depositThroughBankRequestState?.BankAccountNumber
                                      }
                                    </div>
                                  </li>

                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Remarks
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      {depositThroughBankRequestState?.Remarks}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="p-3 pb-4">
                              <h2 className="text-center text-lg font-semibold">
                                Transfer To
                              </h2>
                              <TransferCollectionLedgerAccountsView
                                collectionLedgerState={getSelectedCollectionLedgers(
                                  collectionLedgerState
                                )}
                                // updateCollectionLedgerState={
                                //   updateCollectionLedgerState
                                // }
                                allDisable={true}
                                setCollectionLedgerState={
                                  setCollectionLedgerState
                                }
                                sectionTitle={'Accounts to Deposit'}
                                submitCollectionLedgerAccountsSubmit={
                                  submitCollectionLedgerAccountsSubmit
                                }
                                cardAccountWithdrawableBalance={999999999999990}
                                cardLockRequestHandler={() => {}}
                                cardPinRemainingTry={3}
                                depositThroughBankRequestState={
                                  depositThroughBankRequestState
                                }
                              />
                            </div>
                          </motion.div>
                        )}

                        {activeStep + 1 === 4 && (
                          <CardAccountPinView
                            showAccountInfo={false}
                            titleAccounts="Transfer From"
                            showCardInfo={true}
                            myCards={myCardsResponseData}
                            parentPageState={depositThroughBankRequestState}
                            updateParentPageState={
                              updateDepositThroughBankRequestState
                            }
                          />
                        )}

                        <div className="flex w-full items-center justify-center gap-4 p-6">
                          <MyButton
                            onClick={() => {
                              handleBack();
                            }}
                            id="handleBack"
                            type="button"
                            disabled={activeStep === 0 ? true : false}
                            label="Back"
                            styleClass="w-2/4 rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                            name={''}
                          />

                          <MyButton
                            id="verifyPINRequestHandler"
                            onClick={() => {
                              if (activeStep === 0) {
                                const {
                                  DepositDate,
                                  BankName,
                                  BankAccountNumber,
                                  BankRoutingNumber,
                                  TransactionNumber,
                                  SentAmount,
                                  TransactionReceipt,
                                } = depositThroughBankRequestState;

                                const bankTransactionFields = {
                                  DepositDate,
                                  BankName,
                                  BankAccountNumber,
                                  BankRoutingNumber,
                                  TransactionNumber,
                                  SentAmount,
                                  TransactionReceipt,
                                };

                                let error = '';

                                let fieldName: keyof typeof bankTransactionFields;

                                for (fieldName in bankTransactionFields) {
                                  updateDepositThroughBankRequestState(
                                    fieldName,
                                    bankTransactionFields[fieldName],
                                    totalAmount
                                  );

                                  error =
                                    error +
                                    validateDepositThroughBankRequestState(
                                      fieldName,
                                      bankTransactionFields[fieldName],
                                      totalAmount
                                    );
                                }

                                if (error.length === 0) {
                                  handleNext();
                                } else {
                                  return '';
                                }
                              } else if (activeStep === 1) {
                                if (hasSelectedAccounts.length > 0) {
                                  // let totalAmount = 0;
                                  // const myLedger = collectionLedgerState.filter(
                                  //   (item) => {
                                  //     if (myCardsResponseData) {
                                  //       return (
                                  //         item.AccountNo?.trim() !==
                                  //         myCardsResponseData[0]?.CardsAccounts[0]?.AccountNumber.trim()
                                  //       );
                                  //     } else {
                                  //       return item;
                                  //     }
                                  //   }
                                  // );

                                  // if (myLedger.length > 0) {
                                  //   myLedger.forEach(
                                  //     (collectionLedger, index) => {
                                  //       if (collectionLedger?.isSelected) {
                                  //         totalAmount =
                                  //           totalAmount +
                                  //           collectionLedger.Amount;
                                  //       }
                                  //     }
                                  //   );
                                  // }
                                  if (totalAmount === 0) {
                                    return '';
                                  }
                                  let error = '';
                                  collectionLedgerState.forEach(
                                    (element, index) => {
                                      let fieldName: keyof typeof element;
                                      for (fieldName in element) {
                                        if (element.isSelected) {
                                          updateCollectionLedgerState(
                                            fieldName,
                                            element[fieldName],
                                            index
                                          );
                                          error =
                                            error +
                                            validateCollectionLedgerState(
                                              fieldName,
                                              element[fieldName],
                                              collectionLedgerState[index]
                                            );
                                        }
                                      }
                                    }
                                  );

                                  if (error.length === 0) {
                                    if (
                                      totalAmount ===
                                      depositThroughBankRequestState?.SentAmount
                                    ) {
                                      handleNext();
                                    } else {
                                      return '';
                                    }
                                  }
                                }
                              } else if (activeStep === 2) {
                                handleNext();
                              } else if (activeStep === steps.length - 1) {
                                if (cardPinRemainingTry === 0) {
                                  cardLockRequestHandler();
                                } else {
                                  let error = '';

                                  const { CardAccount, CardNo, CardPIN } =
                                    depositThroughBankRequestState;

                                  const cardFields = {
                                    CardAccount,
                                    CardNo,
                                    CardPIN,
                                  };

                                  let fieldName: keyof typeof cardFields;

                                  for (fieldName in cardFields) {
                                    updateDepositThroughBankRequestState(
                                      fieldName,
                                      cardFields[fieldName]
                                    );

                                    error =
                                      error +
                                      validateDepositThroughBankRequestState(
                                        fieldName,
                                        cardFields[fieldName]
                                      );
                                  }

                                  if (error.length === 0) {
                                    verifyPINRequestHandler();
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
                            styleClass="w-2/4 rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                            name={''}
                            disabled={
                              activeStep === 0 &&
                              !collectionAccountsResponseData
                            }
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
      </>
    );
  }
}

export default DepositThroughBankPage;
