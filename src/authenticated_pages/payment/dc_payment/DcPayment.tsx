import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import CardPage from 'authenticated_pages/info/financial_card/CardPage';
import { CardModel } from 'authenticated_pages/info/financial_card/model/data/CardModel';
import { PaymentServiceResponseModel } from 'authenticated_pages/payment/dc_payment/model/data/PaymentServiceResponseModel';
import CardAccountPinView from 'authenticated_pages/shared/components/CardAccountPinView';
import { CardLockRequestModel } from 'authenticated_pages/shared/model/request/CardLockRequestModel';
import { stepStyle } from 'authenticated_pages/shared/style/stepperStyle';
import OTPValidationView from 'authentication/otp_validation/OTPValidationView';
import CryptoJS from 'crypto-js';
import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import MyButton from 'global_shared/components/MyButton';
import MyDropdown from 'global_shared/components/MyDropdown';
import MyTextInput from 'global_shared/components/MyTextInput';
import FailedDialogue from 'global_shared/components/dialogues/FailedDialogue';
import LoaderDialogue from 'global_shared/components/dialogues/LoaderDialogue';
import SuccessDialogue from 'global_shared/components/dialogues/SuccessDialogue';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import { Size } from 'global_shared/enum/Size';
import useCardPinRemainingTry from 'global_shared/hooks/useCardPinRemainingTry';
import useCommand from 'global_shared/hooks/useCommand';
import { CardHandler } from 'global_shared/model/data/CardHandler';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useMakePaymentState from './hooks/useMakePaymentState';
import { PaymentRequestModel } from './model/request/PaymentRequestModel';
import { validateMakePaymentState } from './validation/validateMakePaymentState';

/**========================================================================
 * ?                                ABOUT
 * @author         :  name_on_card
 * @designation    :  Software Developer
 * @email          :  newtonmitro@gmail.com
 * @description    :
 * @createdOn      :  01 July 2023
 * @updatedBy      :  Israfil
 * @updatedOn      :  07 July 2023
 *========================================================================**/
const steps = ['PAYMENT FORM', 'PAYMENT TO', 'CARD PIN VERIFY'];

function DcPayment() {
  const inputRef = React.useRef<HTMLSelectElement>(null);
  const notify = () => toast('Upcoming feature.');
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const { cardPinRemainingTry, updateCardPinRemainingTry } =
    useCardPinRemainingTry();
  const { makePaymentState, updateMakePaymentState } = useMakePaymentState();

  const {
    loading: myCardsResponseDataLoading,
    data: myCardsResponseData,
    executeCommand: myCardsRequestCommand,
  } = useCommand<CardModel[] | null>();

  const {
    loading: paymentMenusResponseDataLoading,
    data: paymentMenusResponseData,
    executeCommand: paymentMenusRequestCommand,
  } = useCommand<PaymentServiceResponseModel[] | null>();

  console.log(paymentMenusResponseData);

  const {
    loading: cardLockResponseDataLoading,
    data: cardLockResponseData,
    status: cardLockResponseStatus,
    setStatus: setCardLockResponseStatus,
    executeCommand: cardLockRequestCommand,
  } = useCommand<string | null>();

  const {
    data: verifyPinResponseData,
    loading: verifyPinResponseDataLoading,
    status: verifyPinResponseStatus,
    message: verifyPinResponseMessage,
    setStatus: setVerifyPinResponseStatus,
    executeCommand: verifyPinRequestCommand,
  } = useCommand<any>();

  const {
    data: makePaymentResponseData,
    loading: makePaymentResponseDataLoading,
    status: makePaymentResponseStatus,
    message: makePaymentResponseMessage,
    setStatus: setMakePaymentResponseStatus,
    executeCommand: makePaymentRequestCommand,
  } = useCommand<string | null>();

  var myCards: CardHandler | null = null;

  if (myCardsResponseData !== null) {
    myCards = new CardHandler(myCardsResponseData);
  }

  useEffect(() => {
    var paymentMenusRequestModel = new BaseRequestModel(authUser);

    paymentMenusRequestCommand(
      process.env.REACT_APP_BASE_URL + '/payments_v1/getPaymentServices',
      JSON.stringify(paymentMenusRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );

    myCardsRequestCommand(
      process.env.REACT_APP_BASE_URL + '/cards_V2/myCards',
      JSON.stringify(paymentMenusRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
    if (makePaymentState?.NotifyPerson.length === 1) {
      updateMakePaymentState(
        'selectNotifyPerson',
        makePaymentState?.NotifyPerson?.[0]?.PersonId
      );
    } else {
      updateMakePaymentState('selectNotifyPerson', '');
    }

    if (makePaymentState?.NotifyPerson?.length === 1 && inputRef.current) {
      const NotifyPerson = makePaymentState?.NotifyPerson;
      const currentValue = NotifyPerson?.toString() ?? '';
      const selectedNotifyPerson = (inputRef.current.value = currentValue);
      updateMakePaymentState('selectNotifyPerson', selectedNotifyPerson);
    }
  }, [cardLockResponseData, makePaymentState?.ServiceName, inputRef]);

  useEffect(() => {
    if (myCardsResponseData !== null) {
      updateMakePaymentState(
        'CardNo',
        myCardsResponseData?.[0]?.CardNo?.trim()
      );
      if (
        myCardsResponseData?.[0]?.CardsAccounts &&
        myCardsResponseData?.[0]?.CardsAccounts.length === 1
      ) {
        updateMakePaymentState(
          'CardAccount',
          myCardsResponseData?.[0]?.CardsAccounts?.[0]?.AccountNumber.trim()
        );
      } else {
        updateMakePaymentState('CardAccount', '');
      }
    }
  }, [myCardsResponseData]);

  useEffect(() => {
    if (activeStep + 1 !== 3) {
      updateMakePaymentState('CardPIN', '');
    }
  }, [activeStep]);

  const cardLockRequestHandler = () => {
    if (cardPinRemainingTry !== 0) {
      updateCardPinRemainingTry(1);
    } else {
      const cardLockRequestModel = new CardLockRequestModel(authUser);
      cardLockRequestModel.NameOnCard =
        myCards?.getHandledCard()[0]?.NameOnCard;
      cardLockRequestModel.CardNo = myCards?.getHandledCard()[0]?.CardNo;

      cardLockRequestCommand(
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

  const verifyCardPinRequestHandler = () => {
    var encryptPassword = CryptoJS.MD5(makePaymentState?.CardPIN);
    const makePaymentRequestModel = new PaymentRequestModel(authUser);
    if (myCardsResponseData) {
      makePaymentRequestModel.AccHolder =
        // myCardsResponseData[0].CardsAccounts[0].AccountNumber!;
        makePaymentState?.CardAccount;
      makePaymentRequestModel.AccNo =
        // myCardsResponseData[0].CardsAccounts[0].AccountNumber!;
        makePaymentState?.CardAccount;
      makePaymentRequestModel.AccountNo =
        // myCardsResponseData[0].CardsAccounts[0].AccountNumber!;
        makePaymentState?.CardAccount;

      // makePaymentRequestModel.AccType =
      // myCardsResponseData[0].CardsAccounts[0].AccountTypeCode!;
      // makePaymentState?.AccType!;

      makePaymentRequestModel.AccountNumber =
        // myCardsResponseData[0].CardsAccounts[0].AccountNumber!;
        makePaymentState?.CardAccount;
    }

    makePaymentRequestModel.AccTransfer = makePaymentState?.ServiceName;
    makePaymentRequestModel.Amount = parseInt(makePaymentState?.Amount);
    makePaymentRequestModel.CardNo = myCardsResponseData?.[0]?.CardNo!;
    makePaymentRequestModel.SecretKey = encryptPassword.toString();
    makePaymentRequestModel.NameOnCard = myCardsResponseData?.[0]?.Name!;
    makePaymentRequestModel.Remarks = makePaymentState?.Reference;
    makePaymentRequestModel.NotifyPersonId =
      makePaymentState?.selectNotifyPerson;
    makePaymentRequestModel.PaymentServiceCode = makePaymentState?.ServiceCode;

    verifyPinRequestCommand(
      process.env.REACT_APP_BASE_URL + '/cards_V1/verifyCardPIN',
      JSON.stringify(makePaymentRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };

  const makePaymentRequestHandler = (otpData: string) => {
    verifyPinResponseData.OTPValue = otpData;

    makePaymentRequestCommand(
      process.env.REACT_APP_BASE_URL + '/payments_v2/submitPayment',
      JSON.stringify(verifyPinResponseData),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const selectedServiceHandler = (event: any) => {
    if (event.target.value === '') {
      notify();
      return;
    }
    const selectedService = paymentMenusResponseData?.find(
      (obj) => obj?.ServiceAccount === event.target.value
    );

    updateMakePaymentState(event.target.name, event.target.value);
    updateMakePaymentState('ServiceCode', selectedService?.ServiceCode);
    updateMakePaymentState('NotifyPerson', selectedService?.NotifyPerson);
    if (makePaymentState.NotifyPerson.length === 1) {
      updateMakePaymentState(
        'NotifyPersonId',
        makePaymentState.NotifyPerson[0].PersonId
      );
      updateMakePaymentState(
        'selectNotifyPerson',
        makePaymentState.NotifyPerson[0].FullName
      );
    }
  };

  const NotifyPersonHandler = (event: any) => {
    updateMakePaymentState('selectNotifyPerson', event.target.value);
    updateMakePaymentState('NotifyPersonId', event.target.value);
  };
  if (myCardsResponseData?.length === 0) {
    return <CardPage />;
  } else {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        transition={MyTransition.StaggerChildren.Fast}
      >
        <LoaderDialogue
          isLoading={
            verifyPinResponseDataLoading ||
            makePaymentResponseDataLoading ||
            myCardsResponseDataLoading ||
            cardLockResponseDataLoading ||
            paymentMenusResponseDataLoading
          }
        />
        {verifyPinResponseStatus === 'success' && (
          <OTPValidationView
            isOTPValidationViewOpen={
              verifyPinResponseStatus === 'success' ? true : false
            }
            closeOTPValidationView={() => {
              setVerifyPinResponseStatus(null);
            }}
            otpValidateRequestHandler={makePaymentRequestHandler}
            resendOTPRequestHandler={verifyCardPinRequestHandler}
          />
        )}

        {/* Begin Make payment request success dialogue */}

        <SuccessDialogue
          isDialogueOpen={
            makePaymentResponseStatus === 'success' ? true : false
          }
          onCloseButtonClick={() => {
            setMakePaymentResponseStatus(null);
            navigate('/payment/dc_payment');
          }}
        >
          {makePaymentResponseData}
        </SuccessDialogue>
        {/* End Make payment request success dialogue */}

        {/* Begin Make payment request failed dialogue */}

        <FailedDialogue
          dialogueSize={Size.Small}
          isDialogueOpen={makePaymentResponseStatus === 'failed' ? true : false}
          OkButtonText="Retry"
          onOkButtonClick={() => {
            setMakePaymentResponseStatus(null);
          }}
          cancelButtonText="Back"
          onCloseButtonClick={() => {
            navigate('/payment/dc_payment');
          }}
        >
          {makePaymentResponseMessage}
        </FailedDialogue>
        {/* End Make payment request failed dialogue */}

        {/* Begin card lock request success dialogue */}
        <SuccessDialogue
          isDialogueOpen={cardLockResponseStatus === 'success' ? true : false}
          onOkButtonClick={() => {
            setCardLockResponseStatus(null);
          }}
        >
          {cardLockResponseData}
        </SuccessDialogue>

        {/* End card lock request success dialogue */}

        {/* Begin verify card PIN request failed dialogue */}
        {verifyPinResponseMessage?.includes('Invalid Card PIN') && (
          <FailedDialogue
            dialogueSize={Size.Small}
            isDialogueOpen={verifyPinResponseStatus === 'failed' ? true : false}
            cancelButtonText="ok"
            onCloseButtonClick={() => {
              setVerifyPinResponseStatus(null);
              cardLockRequestHandler();
            }}
          >
            {verifyPinResponseMessage +
              'Remaining Tries' +
              ' ' +
              cardPinRemainingTry}
          </FailedDialogue>
        )}
        {/* Begin verify card PIN request failed dialogue */}

        <div className="grid grid-cols-1 gap-8 rounded ">
          <motion.div
            variants={MyVariants.SlideInFromRight}
            transition={MyTransition.Spring.Low}
            className=" items-center rounded bg-surface  shadow lg:p-10"
          >
            <div className="w-full">
              <motion.h2 className="p-7 text-center text-lg font-bold">
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
              </motion.h2>
              <div className="flex justify-center">
                <div className="w-full md:w-3/5">
                  {activeStep + 1 === 1 && (
                    <CardAccountPinView
                      showAccountInfo={true}
                      titleAccounts="Payment From"
                      showCardInfo={false}
                      myCards={myCardsResponseData}
                      showAccountInfoCardNo={true}
                      parentPageState={makePaymentState}
                      updateParentPageState={updateMakePaymentState}
                    />
                  )}
                  {activeStep + 1 === 2 && (
                    <div className="mt-2 grid grid-cols-1 gap-5 p-7 md:grid-cols-1">
                      <div className="relative mt-3 w-full">
                        <MyDropdown
                          label="Service Name"
                          name="ServiceName"
                          id="ServiceName"
                          required={true}
                          disabled={false}
                          value={makePaymentState?.ServiceName}
                          error={makePaymentState?.Errors?.ServiceName}
                          dropDownData={paymentMenusResponseData?.map(
                            (obj, index) => {
                              return {
                                id: index,
                                value: obj?.ServiceAccount,
                                label: obj?.ServiceName,
                              };
                            }
                          )}
                          onChange={selectedServiceHandler}
                          leftIcon={
                            <i className="fa-solid fa-truck-medical"></i>
                          }
                        />
                      </div>

                      <div className="relative mt-3 w-full">
                        <MyDropdown
                          ref={inputRef}
                          label="Notify Person"
                          name="selectNotifyPerson"
                          required={true}
                          disabled={false}
                          value={makePaymentState.selectNotifyPerson}
                          error={makePaymentState?.Errors?.selectNotifyPerson}
                          id="NotifyPersonId"
                          leftIcon={<i className="fa-solid fa-user"></i>}
                          dropDownData={makePaymentState?.NotifyPerson?.map(
                            (obj: any, index: any) => {
                              return {
                                id: index,
                                value: obj?.PersonId,
                                label: obj?.FullName,
                              };
                            }
                          )}
                          // onChange={(event) => {
                          //   updateMakePaymentState(
                          //     event.target.name,
                          //     event.target.value
                          //   );
                          //   updateMakePaymentState(
                          //     event.target.name,
                          //     event.target.value
                          //   );
                          // }}
                          onChange={NotifyPersonHandler}
                        />
                      </div>

                      <div className="">
                        <MyTextInput
                          label="Amount"
                          name="Amount"
                          id="Amount"
                          value={parseInt(makePaymentState?.Amount.toString())}
                          inputType="number"
                          disabled={false}
                          required={true}
                          error={makePaymentState?.Errors?.Amount}
                          onChangeHandler={(event) => {
                            updateMakePaymentState(
                              event.target.name,
                              event.target.value
                            );
                          }}
                          leftIcon={
                            <i className="fa-solid fa-bangladeshi-taka-sign"></i>
                          }
                        />
                      </div>
                      <div className="">
                        <MyTextInput
                          label={
                            makePaymentState?.ServiceName === 'T-0058497'
                              ? 'Student ID'
                              : 'Reference'
                          }
                          name="Reference"
                          id="Reference"
                          value={makePaymentState?.Reference}
                          inputType="text"
                          disabled={false}
                          required={false}
                          error={makePaymentState?.Errors?.Reference}
                          onChangeHandler={(event) => {
                            updateMakePaymentState(
                              event.target.name,
                              event.target.value
                            );
                          }}
                          leftIcon={<i className="fa-solid fa-asterisk"></i>}
                        />
                      </div>
                    </div>
                  )}
                  {activeStep + 1 === 3 && (
                    <CardAccountPinView
                      showAccountInfo={false}
                      titleAccounts=""
                      showCardInfo={true}
                      myCards={myCardsResponseData}
                      parentPageState={makePaymentState}
                      updateParentPageState={updateMakePaymentState}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center gap-4 p-6">
              <MyButton
                disabled={activeStep === 0 ? true : false}
                onClick={() => {
                  handleBack();
                }}
                type="button"
                label="Back"
                styleClass="w-2/4 md:w-1/4 rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                name={''}
                id="handleBack"
              />

              <MyButton
                disabled={false}
                onClick={() => {
                  var error = '';
                  if (activeStep + 1 === 1) {
                    const { CardAccount, AccountTypeName, AccountNumber } =
                      makePaymentState;
                    const cardFields = {
                      CardAccount,
                      AccountTypeName,
                      AccountNumber,
                    };
                    let fieldName: keyof typeof cardFields;
                    for (fieldName in cardFields) {
                      updateMakePaymentState(fieldName, cardFields[fieldName]);
                      error =
                        error +
                        validateMakePaymentState(
                          fieldName,
                          makePaymentState[fieldName],
                          makePaymentState?.WithdrawableBalance
                        );
                    }

                    if (error.length === 0) {
                      handleNext();
                    }
                  } else if (activeStep + 1 === 2) {
                    const {
                      ServiceName,
                      Amount,
                      selectNotifyPerson,
                      AccountTypeName,
                    } = makePaymentState;

                    const cardFields = {
                      ServiceName,
                      Amount,
                      selectNotifyPerson,
                      AccountTypeName,
                    };
                    let fieldName: keyof typeof cardFields;

                    for (fieldName in cardFields) {
                      updateMakePaymentState(
                        fieldName,
                        makePaymentState[fieldName]
                      );
                      error =
                        error +
                        validateMakePaymentState(
                          fieldName,
                          makePaymentState[fieldName],
                          makePaymentState?.WithdrawableBalance
                        );
                    }

                    if (error.length === 0) {
                      handleNext();
                    }
                  } else if (activeStep + 1 === 3) {
                    const { CardAccount, CardNo, CardPIN } = makePaymentState;

                    const cardFields = {
                      CardAccount,
                      CardNo,
                      CardPIN,
                    };

                    let fieldName: keyof typeof cardFields;
                    for (fieldName in cardFields) {
                      updateMakePaymentState(
                        fieldName,
                        makePaymentState[fieldName]
                      );
                      error =
                        error +
                        validateMakePaymentState(
                          fieldName,
                          makePaymentState[fieldName],
                          makePaymentState?.WithdrawableBalance
                        );
                    }

                    if (error) {
                      window.scrollTo({
                        top: window.innerHeight / 2,
                        behavior: 'smooth',
                      });
                    }
                    if (error.length === 0) {
                      if (cardPinRemainingTry === 0) {
                        cardLockRequestHandler();
                      } else {
                        verifyCardPinRequestHandler();
                      }
                    }
                  }
                }}
                type="button"
                label="Next"
                styleClass="w-2/4 md:w-1/4 rounded border bg-primary py-2 font-semibold uppercase text-onPrimary hover:bg-primaryVariant"
                name={''}
                id="verifyCardPin"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
}

export default DcPayment;
