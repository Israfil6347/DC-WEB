import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { stepStyle } from 'authenticated_pages/shared/style/stepperStyle';
import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import MyButton from 'global_shared/components/MyButton';
import PageContainer from 'global_shared/components/PageContainer';
import Notes from '../shared/components/Notes';
import React, { useContext, useEffect, useState } from 'react';
import useCommand from 'global_shared/hooks/useCommand';
import { TermsAndConditionModel } from 'global_shared/model/data/TermsAndConditionModel';
import { GetPolicyRequestModel } from 'authenticated_pages/shared/model/request/GetPolicyRequestModel';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import CardAccountPinView from 'authenticated_pages/shared/components/CardAccountPinView';
import CardPage from 'authenticated_pages/info/financial_card/CardPage';
import { CardHandler } from 'global_shared/model/data/CardHandler';
import { CombinedCardModel } from 'global_shared/model/data/CombinedCardModel';
import { CardModel } from 'authenticated_pages/info/financial_card/model/data/CardModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';
import { CardLockRequestModel } from 'authenticated_pages/shared/model/request/CardLockRequestModel';
import useCardPinRemainingTry from 'global_shared/hooks/useCardPinRemainingTry';
import useTransferbKash from './hooks/useTransferbKash';
import { bKashTransferValidation } from './validation/bKashTransferValidation';
import { TransferbKashRequestModel } from './model/TransferbKashRequestModel';
import MyTextInput from 'global_shared/components/MyTextInput';
import CryptoJS from 'crypto-js';
import { Size } from 'global_shared/enum/Size';
import MyModal from 'global_shared/components/MyModal';
import MyDialogueView from 'global_shared/components/dialogues/MyDialogueView';
import { logoIcon } from 'global_shared/data/base64Icons';
const steps = ['DEPOSIT FOR', 'TRANSFER AMOUNT', 'PREVIEW', 'CARD PIN VERIFY'];

function TransferbkashRequest() {
  const [activeStep, setActiveStep] = useState(0);
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const [openTransactionLimitDialog, setOpenTransactionLimitDialog] =
    useState(false);

  console.log(openTransactionLimitDialog);
  const { cardPinRemainingTry, updateCardPinRemainingTry } =
    useCardPinRemainingTry();

  const {
    updateTransferbKashRequestState,
    bKashTransferRequestState,
    setTransferbKashRequestState,
  } = useTransferbKash();
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
    loading: getMfsPolicyResponseDataLoading,
    data: getMfsPolicyResponseData,
    executeCommand: getMfsPolicyRequestExecutedCommand,
  } = useCommand<TermsAndConditionModel | null>();
  const {
    loading: cardLockResponseDataLoading,
    data: cardLockResponseData,
    status: cardLockResponseStatus,
    setStatus: setCardLockResponseStatus,
    executeCommand: cardLockRequestExecutedCommand,
  } = useCommand<string>();

  useEffect(() => {
    const getPolicyRequestModel = new GetPolicyRequestModel(authUser);
    getPolicyRequestModel.AccountModuleCode = '16';
    getPolicyRequestModel.ApplicationName = 'MFS';
    getPolicyRequestModel.ContentName = 'RealTime Deposit Notes';

    getMfsPolicyRequestExecutedCommand(
      process.env.REACT_APP_BASE_URL + '/others_v1/GetMfsPolicy',
      JSON.stringify(getPolicyRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  }, []);

  useEffect(() => {
    if (myCardsResponseData !== null) {
      updateTransferbKashRequestState(
        'CardNo',
        myCardsResponseData?.[0].CardNo?.trim()
      );
      if (
        myCardsResponseData?.[0]?.CardsAccounts &&
        myCardsResponseData?.[0]?.CardsAccounts.length === 1
      ) {
        updateTransferbKashRequestState(
          'CardAccount',
          myCardsResponseData?.[0]?.CardsAccounts?.[0].AccountNumber.trim()
        );
      }
    }
  }, [myCardsResponseData]);
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

  var card: CombinedCardModel | null = null;
  if (myCardsResponseData !== null) {
    const cardHandler = new CardHandler(myCardsResponseData);
    card = cardHandler.getHandledCard()[0];
  }

  const cardLockRequestHandler = () => {
    if (cardPinRemainingTry !== 0) {
      updateCardPinRemainingTry(1);
    } else {
      const cardLockRequestModel = new CardLockRequestModel(authUser);
      cardLockRequestModel.NameOnCard = myCardsResponseData?.[0]?.Name;
      cardLockRequestModel.CardNo = myCardsResponseData?.[0]?.CardNo;

      cardLockRequestExecutedCommand(
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

  const verifyCardPinHandler = () => {
    var encryptPassword = CryptoJS.MD5(bKashTransferRequestState?.CardPIN);
    const transferbKashRequestModel = new TransferbKashRequestModel(authUser);
    transferbKashRequestModel.AccNo = bKashTransferRequestState?.CardAccount;
    transferbKashRequestModel.AccType = bKashTransferRequestState?.AccType;
    transferbKashRequestModel.CardNo = myCardsResponseData?.[0]?.CardNo!;
    transferbKashRequestModel.NameOnCard =
      bKashTransferRequestState?.CardAccount;
    transferbKashRequestModel.Amount = parseInt(
      bKashTransferRequestState?.Amount
    );
    transferbKashRequestModel.TransferToAcc = authUser.RegMobile;
    transferbKashRequestModel.RecipientName = authUser.UserName;
    transferbKashRequestModel.SecretKey = encryptPassword.toString();
  };

  if (myCardsResponseData?.length === 0) {
    return <CardPage />;
  } else {
    return (
      <>
        <MyModal
          size={Size.Small}
          show={openTransactionLimitDialog}
          onClose={() => setOpenTransactionLimitDialog(false)}
        >
          <MyDialogueView
            dialogueHeader={
              <div className="bg-background p-6">
                <div className="hover:animate-swing flex w-full flex-col items-center hover:cursor-pointer">
                  <img src={logoIcon} alt="" className="w-28" />
                  <h3 className="font-bold text-primary">
                    Dhaka Credit Web Portal
                  </h3>
                </div>
              </div>
            }
            dialogueFooter={
              <div className="flex w-full justify-center gap-4 bg-background p-4">
                <button
                  id="openTransactionLimitDialog"
                  className=" w-2/5  rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                  onClick={() => {
                    setOpenTransactionLimitDialog(false);
                  }}
                >
                  OK
                </button>
              </div>
            }
            onCancel={() => {
              setOpenTransactionLimitDialog(false);
            }}
          >
            <div className="p-4">
              <motion.h2 className="pb-4 text-center font-extrabold uppercase">
                Transaction Limit
              </motion.h2>
              <table className="table w-full">
                <thead className="text-center">
                  <tr className="sticky -top-0 hidden h-16 w-full bg-surface text-sm uppercase text-onSurface shadow-sm md:table-row">
                    <th className="border border-gray-200 p-2 text-left ">
                      <p className="p-2  md:p-0"> Title</p>
                    </th>
                    <th className="border border-gray-200 p-2 text-left ">
                      <p className="p-2 text-center md:p-0">Amount</p>
                    </th>
                  </tr>
                </thead>
                <tbody className="flex-1 bg-backgroundVariant sm:flex-none ">
                  <tr className="JobApplications my-3 flex w-full flex-col flex-wrap border border-t border-gray-700 first:border-t-0 even:bg-red-50 md:my-0 md:table-row">
                    <td className="border border-gray-200 p-2 text-left">
                      <label className="p-2 md:hidden md:p-0" htmlFor="">
                        Title
                      </label>
                      <p className="p-2 font-semibold md:p-0 md:font-normal">
                        Minimum Amount
                      </p>
                    </td>
                    <td className="border border-gray-200 p-2 text-left">
                      <label
                        className="p-2 text-center md:hidden md:p-0"
                        htmlFor=""
                      >
                        Amount
                      </label>
                      <p className="p-2 text-center font-semibold md:p-0 md:font-normal">
                        50
                      </p>
                    </td>
                  </tr>
                  <tr className="JobApplications my-3 flex w-full flex-col flex-wrap border border-t border-gray-700 first:border-t-0 even:bg-red-50 md:my-0 md:table-row">
                    <td className="border border-gray-200 p-2 text-left">
                      <label className="p-2 md:hidden md:p-0" htmlFor="">
                        Title
                      </label>
                      <p className="p-2 font-semibold md:p-0 md:font-normal">
                        Daily Available Limit
                      </p>
                    </td>
                    <td className="border border-gray-200 p-2 text-left">
                      <label
                        className="p-2 text-center md:hidden md:p-0"
                        htmlFor=""
                      >
                        Amount
                      </label>
                      <p className="p-2 text-center font-semibold md:p-0 md:font-normal">
                        50,000
                      </p>
                    </td>
                  </tr>
                  <tr className="JobApplications my-3 flex w-full flex-col flex-wrap border border-t border-gray-700 first:border-t-0 even:bg-red-50 md:my-0 md:table-row">
                    <td className="border border-gray-200 p-2 text-left">
                      <label className="p-2 md:hidden md:p-0" htmlFor="">
                        Title
                      </label>
                      <p className="p-2 font-semibold md:p-0 md:font-normal">
                        Maximum Amount
                      </p>
                    </td>
                    <td className="border border-gray-200 p-2 text-left">
                      <label
                        className="p-2 text-center md:hidden md:p-0"
                        htmlFor=""
                      >
                        Amount
                      </label>
                      <p className="p-2 text-center font-semibold md:p-0 md:font-normal">
                        1,00,000
                      </p>
                    </td>
                  </tr>
                  <tr className="JobApplications my-3 flex w-full flex-col flex-wrap border border-t border-gray-700 first:border-t-0 even:bg-red-50 md:my-0 md:table-row">
                    <td className="border border-gray-200 p-2 text-left">
                      <label className="p-2 md:hidden md:p-0" htmlFor="">
                        Title
                      </label>
                      <p className="p-2 font-semibold md:p-0 md:font-normal">
                        Daily Available Count
                      </p>
                    </td>
                    <td className="border border-gray-200 p-2 text-left">
                      <label
                        className="p-2 text-center md:hidden md:p-0"
                        htmlFor=""
                      >
                        Amount
                      </label>
                      <p className="p-2 text-center font-semibold md:p-0 md:font-normal">
                        5
                      </p>
                    </td>
                  </tr>
                  <tr className="JobApplications my-3 flex w-full flex-col flex-wrap border border-t border-gray-700 first:border-t-0 even:bg-red-50 md:my-0 md:table-row">
                    <td className="border border-gray-200 p-2 text-left">
                      <label className="p-2 md:hidden md:p-0" htmlFor="">
                        Title
                      </label>
                      <p className="p-2 font-semibold md:p-0 md:font-normal">
                        Monthly Available Limit
                      </p>
                    </td>
                    <td className="border border-gray-200 p-2 text-left">
                      <label
                        className="p-2 text-center md:hidden md:p-0"
                        htmlFor=""
                      >
                        Amount
                      </label>
                      <p className="p-2 text-center font-semibold md:p-0 md:font-normal">
                        2,00,000
                      </p>
                    </td>
                  </tr>
                  <tr className="JobApplications my-3 flex w-full flex-col flex-wrap border border-t border-gray-700 first:border-t-0 even:bg-red-50 md:my-0 md:table-row">
                    <td className="border border-gray-200 p-2 text-left">
                      <label className="p-2 md:hidden md:p-0" htmlFor="">
                        Title
                      </label>
                      <p className="p-2 font-semibold md:p-0 md:font-normal">
                        Monthly Available Count
                      </p>
                    </td>
                    <td className="border border-gray-200 p-2 text-left">
                      <label
                        className="p-2 text-center md:hidden md:p-0"
                        htmlFor=""
                      >
                        Amount
                      </label>
                      <p className="p-2 text-center font-semibold md:p-0 md:font-normal">
                        20
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </MyDialogueView>
        </MyModal>
        <div className="hidden">
          <motion.div
            initial="initial"
            animate="animate"
            transition={MyTransition.StaggerChildren.Fast}
          >
            <PageContainer>
              <section className="flex flex-col-reverse items-start gap-6 bg-surface text-justify md:flex-row">
                <div className="w-full">
                  <div className="">
                    <div className="bg-surface  px-4 text-primary shadow-sm md:px-12">
                      <div className="animate-backInRight py-20 text-center">
                        <motion.h1
                          variants={MyVariants.SlideInFromRight}
                          transition={MyTransition.Spring.Low}
                          className=" text-3xl font-extrabold"
                        >
                          bKash Transfer Request
                        </motion.h1>
                        <motion.p
                          variants={MyVariants.SlideInFromRight}
                          transition={MyTransition.Spring.Low}
                          className="-mt-1"
                        >
                          Thank you for showing your interest on us, We are
                          going to implement "bKash Transfer Request" very soon
                          please connect with us.
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </PageContainer>
          </motion.div>
        </div>
        <div className="">
          <motion.div
            initial="initial"
            animate="animate"
            transition={MyTransition.StaggerChildren.Fast}
          >
            <div className=" cursor-pointer">
              <section className="flex flex-col-reverse items-start gap-6 text-justify md:flex-row">
                <div className="w-full">
                  <div className="">
                    <div className="flex flex-col gap-6 lg:flex-row">
                      <div className="flex w-full flex-col gap-6 lg:w-4/12">
                        <Notes
                          data={{
                            __html: getMfsPolicyResponseData?.BanglaContent!,
                          }}
                        />
                      </div>
                      <motion.div
                        variants={MyVariants.SlideInFromRight}
                        transition={MyTransition.Spring.Low}
                        className="w-full lg:w-8/12"
                      >
                        <div className="rounded-md bg-surface p-7 shadow">
                          {/* stepper */}
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

                          {/* content */}
                          {activeStep + 1 === 1 && (
                            <motion.div
                              variants={MyVariants.SlideInFromRight}
                              transition={MyTransition.Spring.Low}
                            >
                              <CardAccountPinView
                                showAccountInfo={true}
                                titleAccounts="Transfer From"
                                showCardInfo={false}
                                showAccountInfoCardNo={true}
                                myCards={myCardsResponseData}
                                parentPageState={bKashTransferRequestState}
                                updateParentPageState={
                                  updateTransferbKashRequestState
                                }
                              />
                            </motion.div>
                          )}
                          {activeStep + 1 === 2 && (
                            <div>
                              <div className="p-10">
                                <MyTextInput
                                  label=" Amount"
                                  name="Amount"
                                  inputType="number"
                                  id="Amount"
                                  disabled={false}
                                  required={false}
                                  value={bKashTransferRequestState?.Amount.toString()}
                                  error={
                                    bKashTransferRequestState.Errors.Amount
                                  }
                                  onChangeHandler={(event) => {
                                    updateTransferbKashRequestState(
                                      event.target.name,
                                      event.target.value,
                                      bKashTransferRequestState?.WithdrawableBalance
                                    );
                                  }}
                                  leftIcon={
                                    <i className="fa-solid fa-bangladeshi-taka-sign"></i>
                                  }
                                />
                                <div
                                  className="pt-4 text-sm text-primary"
                                  onClick={() => {
                                    setOpenTransactionLimitDialog(true);
                                  }}
                                >
                                  <p className="hover:underline group-hover:cursor-pointer">
                                    Transaction limit
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeStep + 1 === 3 && (
                            <motion.div
                              variants={MyVariants.SlideInFromRight}
                              transition={MyTransition.Spring.Low}
                            >
                              <div className="py-6">
                                <h2 className="text-center text-lg font-bold">
                                  SENDER
                                </h2>
                                <ul className="m-6 divide-y overflow-hidden text-justify">
                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Transfer From
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      {myCardsResponseData?.[0]?.Name}
                                    </div>
                                  </li>

                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Account Type
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      {
                                        bKashTransferRequestState?.AccountTypeName
                                      }
                                    </div>
                                  </li>
                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Account Number
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      {bKashTransferRequestState?.CardAccount}
                                    </div>
                                  </li>
                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Transfer Amount
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      {bKashTransferRequestState?.Amount}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="">
                                <h2 className="text-center text-lg font-bold">
                                  RECEIVER
                                </h2>
                                <ul className="m-6 divide-y overflow-hidden text-justify">
                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Recipient Name
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      {myCardsResponseData?.[0]?.Name}
                                    </div>
                                  </li>

                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Account Type
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      bKash
                                    </div>
                                  </li>
                                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                                    <div className="w-full text-left md:w-1/2">
                                      Account Number
                                    </div>
                                    <div className="w-full text-right md:w-1/2">
                                      {authUser?.RegMobile}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </motion.div>
                          )}

                          {activeStep + 1 === 4 && (
                            <motion.div
                              variants={MyVariants.SlideInFromRight}
                              transition={MyTransition.Spring.Low}
                            >
                              <CardAccountPinView
                                showAccountInfo={false}
                                titleAccounts="Transfer From"
                                showCardInfo={true}
                                showAccountInfoCardNo={true}
                                myCards={myCardsResponseData}
                                parentPageState={bKashTransferRequestState}
                                updateParentPageState={
                                  updateTransferbKashRequestState
                                }
                              />
                            </motion.div>
                          )}

                          {/* stepper button */}
                          {/* {activeStep + 1 !== 3 && <div></div>} */}

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
                              onClick={() => {
                                var error = '';
                                if (activeStep === 0) {
                                  const { AccountTypeName, CardAccount } =
                                    bKashTransferRequestState;
                                  const cardFields = {
                                    AccountTypeName,
                                    CardAccount,
                                  };
                                  let fieldName: keyof typeof cardFields;

                                  for (fieldName in cardFields) {
                                    updateTransferbKashRequestState(
                                      fieldName,
                                      cardFields[fieldName],
                                      bKashTransferRequestState?.WithdrawableBalance
                                    );
                                    error =
                                      error +
                                      bKashTransferValidation(
                                        fieldName,
                                        bKashTransferRequestState[fieldName],
                                        bKashTransferRequestState?.WithdrawableBalance
                                      );
                                  }
                                  if (error.length === 0) {
                                    handleNext();
                                  }
                                } else if (activeStep === 1) {
                                  const { Amount } = bKashTransferRequestState;
                                  const cardFields = {
                                    Amount,
                                  };
                                  let fieldName: keyof typeof cardFields;

                                  for (fieldName in cardFields) {
                                    updateTransferbKashRequestState(
                                      fieldName,
                                      cardFields[fieldName],
                                      bKashTransferRequestState?.WithdrawableBalance
                                    );
                                    error =
                                      error +
                                      bKashTransferValidation(
                                        fieldName,
                                        bKashTransferRequestState[fieldName],
                                        bKashTransferRequestState?.WithdrawableBalance
                                      );
                                  }
                                  if (error.length === 0) {
                                    handleNext();
                                  }
                                } else if (activeStep === 2) {
                                  handleNext();
                                } else if (activeStep === 3) {
                                  const { CardPIN } = bKashTransferRequestState;
                                  const cardFields = {
                                    CardPIN,
                                  };
                                  let fieldName: keyof typeof cardFields;
                                  for (fieldName in cardFields) {
                                    updateTransferbKashRequestState(
                                      fieldName,
                                      cardFields[fieldName]
                                    );
                                    error =
                                      error +
                                      bKashTransferValidation(
                                        fieldName,
                                        bKashTransferRequestState[fieldName],
                                        bKashTransferRequestState?.WithdrawableBalance
                                      );
                                  }

                                  if (activeStep === steps.length - 1) {
                                    if (cardPinRemainingTry === 0) {
                                      cardLockRequestHandler();
                                    } else {
                                      verifyCardPinHandler();
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
                              id="verifyCardPinHandler"
                              styleClass="w-2/4 rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                              name={''}
                              disabled={false}
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
      </>
    );
  }
}

export default TransferbkashRequest;
