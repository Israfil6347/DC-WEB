import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import useCommand from 'global_shared/hooks/useCommand';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonDependentAccountModel } from '../../accounts/my_accounts/model/data/AccountStatementModel';
import { PersonDependentAccountRequestModel } from './model/request/PersonDependentAccountRequestModel';
import DependentList from './components/DependentList';
import { FamilyAndRelativeViewModel } from '../family_and_relatives/model/data/FamilyAndRelativeViewModel';
import useAddDependantState from './hook/useAddDependantState';
import { GetAccountRequestModel } from 'authenticated_pages/accounts/my_accounts/model/request/GetAccountRequestModel';
import AddDependent from './components/AddDependent';
import { AddDependentRequestModel } from './model/request/AddDependentRequestModel';
import { Size } from 'global_shared/enum/Size';
import OTPValidationView from 'authentication/otp_validation/OTPValidationView';
import { MobileVerifyRequestModel } from './model/request/MobileVerifyRequestModel';
import SuccessDialogue from 'global_shared/components/dialogues/SuccessDialogue';
import FailedDialogue from 'global_shared/components/dialogues/FailedDialogue';
import LoaderDialogue from 'global_shared/components/dialogues/LoaderDialogue';

function DependentsAccountPage() {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

  const { addDependantState, updateAddDependantState } = useAddDependantState();
  const navigate = useNavigate();
  const {
    loading: personDependentAccountResponseDataLoading,
    data: personDependentAccountResponseData,
    status: personDependentAccountResponseStatus,
    executeCommand: getPersonDependentAccountRequestExecuteCommand,
  } = useCommand<PersonDependentAccountModel[] | null>();

  const {
    loading: getFamilyAndRelativesResponseDataLoading,
    data: getFamilyAndRelativesResponseData,
    executeCommand: getFamilyAndRelativesRequestCommand,
  } = useCommand<FamilyAndRelativeViewModel[]>();

  const {
    loading: personDependentAccountListResponseDataLoading,
    data: personDependentAccountListResponseData,
    status: personDependentAccountListResponseStatus,
    executeCommand: getPersonDependentAccountListRequestExecuteCommand,
  } = useCommand<PersonDependentAccountModel[] | null>();

  const {
    loading: addDependentRequestCommandResponseDataLoading,
    data: addDependentRequestCommandResponseData,
    message: addDependentRequestCommandResponseMessage,
    status: addDependentRequestCommandResponseStatus,
    setStatus: setAddDependentRequestCommandResponseStatus,
    executeCommand: addDependentRequestCommand,
  } = useCommand();

  const {
    loading: verifyMobileNumberResponseDataLoading,
    data: verifyMobileNumberResponseData,
    status: verifyMobileNumberResponseStatus,
    setStatus: setVerifyMobileNumberResponseStatus,
    executeCommand: verifyMobileNumberRequestExecuteCommand,
  } = useCommand<string | null>();

  const GetAccountListHandler = (productCode: any) => {
    const myAccountsRequestModel = new GetAccountRequestModel(authUser);
    myAccountsRequestModel.AccHolderPersonId = productCode;

    getPersonDependentAccountListRequestExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/accounts_V1/getMyAccounts',
      JSON.stringify(myAccountsRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };

  useEffect(() => {
    const personDependentAccountRequestModel =
      new PersonDependentAccountRequestModel(authUser);
    personDependentAccountRequestModel.DependentPersonId = -1;

    getPersonDependentAccountRequestExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/Accounts_V1/getDependentAccounts',
      JSON.stringify(personDependentAccountRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  }, [
    addDependentRequestCommandResponseStatus,
    personDependentAccountResponseStatus,
  ]);

  useEffect(() => {
    const addFamilyRequestModel = new BaseRequestModel(authUser);
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
  }, []);

  const MobileNumberVerifyHandler = () => {
    const mobileVerifyRequestModel = new MobileVerifyRequestModel(authUser);
    mobileVerifyRequestModel.MobileNo = addDependantState.MobileNumber;
    mobileVerifyRequestModel.IsRegistered = false;

    verifyMobileNumberRequestExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/Auth_V1/VerifyMobileNumber',
      JSON.stringify(mobileVerifyRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const AddDependentHandler = (otpData: string) => {
    const addDependentRequestModel = new AddDependentRequestModel(authUser);
    addDependentRequestModel.AccountOperators.push({
      AccountOperatorId: authUser.PersonId,
      AccountHolderInfoId: parseInt(addDependantState?.dependentAccounts),
    });
    addDependentRequestModel.OTPValue = otpData;
    addDependentRequestModel.OTPRegId = verifyMobileNumberResponseData;
    addDependentRequestModel.Remarks = 'Add Dependent';

    addDependentRequestCommand(
      process.env.REACT_APP_BASE_URL + '/info_V1/addAccountOperator',
      JSON.stringify(addDependentRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };
  const clearAll = () => {
    // setAddDependantState({
    //   Dependent: '',
    //   dependentAccounts: '',
    //   MobileNumber: '',
    //   Errors: {
    //     Dependent: '',
    //     dependentAccounts: '',
    //     MobileNumber: '',
    //   },
    // });
    updateAddDependantState('MobileNumber', '');
  };

  const FamilyAndRelatives = (getFamilyAndRelativesResponseData || [])
    .map((obj, index) => {
      if (obj && obj.RequestStatus === 'Pending For Approval') {
        return null;
      }

      if (obj.Age !== undefined && obj.Age < 18 && !obj.HasOperator) {
        return {
          id: index,
          label: obj.FullName || '',
          value: obj.PersonId || '',
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <>
      <LoaderDialogue
        isLoading={
          addDependentRequestCommandResponseDataLoading ||
          verifyMobileNumberResponseDataLoading ||
          getFamilyAndRelativesResponseDataLoading ||
          personDependentAccountResponseDataLoading ||
          personDependentAccountListResponseDataLoading
        }
      />

      <SuccessDialogue
        dialogueSize={Size.Small}
        isDialogueOpen={
          addDependentRequestCommandResponseStatus === 'success' ? true : false
        }
        onCloseButtonClick={() => {
          setAddDependentRequestCommandResponseStatus(null);
          setVerifyMobileNumberResponseStatus(null);
          navigate('/info/my_info');
        }}
      >
        {addDependentRequestCommandResponseData}
      </SuccessDialogue>
      <FailedDialogue
        dialogueSize={Size.Small}
        isDialogueOpen={
          addDependentRequestCommandResponseStatus === 'failed' ? true : false
        }
        OkButtonText="Retry"
        onOkButtonClick={() => {
          setAddDependentRequestCommandResponseStatus(null);
        }}
        cancelButtonText="Back"
        onCloseButtonClick={() => {
          setAddDependentRequestCommandResponseStatus(null);
          setVerifyMobileNumberResponseStatus(null);
        }}
      >
        <div className="px-8 py-6 text-center md:px-14">
          {addDependentRequestCommandResponseMessage}
        </div>
      </FailedDialogue>

      {verifyMobileNumberResponseStatus === 'success' && (
        <OTPValidationView
          isOTPValidationViewOpen={
            verifyMobileNumberResponseStatus === 'success' ? true : false
          }
          closeOTPValidationView={() => {
            setVerifyMobileNumberResponseStatus(null);
          }}
          otpValidateRequestHandler={AddDependentHandler}
          resendOTPRequestHandler={MobileNumberVerifyHandler}
        />
      )}

      <motion.div
        initial="initial"
        animate="animate"
        transition={MyTransition.StaggerChildren.Fast}
        className={`grid grid-cols-1 gap-4 md:grid-cols-2`}
      >
        <div className="">
          <motion.div
            variants={MyVariants.SlideInFromLeft}
            transition={MyTransition.Spring.Low}
            className="rounded-md bg-surface px-2 shadow "
          >
            <h2 className="p-4 text-center text-xl font-bold uppercase text-primary">
              Dependent
            </h2>
            {personDependentAccountResponseData?.length !== 0 &&
            personDependentAccountResponseData !== null ? (
              <DependentList
                personDependentAccountResponseData={
                  personDependentAccountResponseData
                }
              />
            ) : (
              <div className="p-10 text-center font-semibold">
                <motion.p
                  variants={MyVariants.SlideInFromRight}
                  transition={MyTransition.Spring.Low}
                  className=""
                >
                  You do not have any dependent
                </motion.p>
              </div>
            )}
          </motion.div>

          {/* )} */}
        </div>
        <div>
          <div>
            <motion.div
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="rounded-md bg-surface"
            >
              <AddDependent
                UpdateAddDependantState={updateAddDependantState}
                addDependantState={addDependantState}
                getFamilyAndRelativesResponseData={
                  getFamilyAndRelativesResponseData
                }
                AddDependentHandler={MobileNumberVerifyHandler}
                GetAccountListHandler={GetAccountListHandler}
                personDependentAccountListResponseData={
                  personDependentAccountListResponseData
                }
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* End account list */}
    </>
  );
}

export default DependentsAccountPage;
