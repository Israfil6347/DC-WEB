import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import { useContext, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import MySearchInput from 'global_shared/components/MySearchInput';
import useCounterInformation from './hooks/useCounterInformation';
import { CounterInformationRequestModel } from './model/request/CounterInformationRequestModel';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import useCommand from 'global_shared/hooks/useCommand';
import FailedDialogue from 'global_shared/components/dialogues/FailedDialogue';
import { Size } from 'global_shared/enum/Size';
import { CounterInformationData } from './model/data/CounterInformationData';
import LoaderDialogue from 'global_shared/components/dialogues/LoaderDialogue';

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

const AgmCounter = () => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const { CounterInformationState, updateCounterInformationState } =
    useCounterInformation();

  const {
    loading: isCounterInformationResponseDataLoaded,
    data: CounterInformationResponseData,
    message: counterInformationResponseMessage,
    status: counterInformationResponseStatus,
    setStatus: setCounterInformationResponseStatus,
    executeCommand: getCounterInformationExecuteCommand,
  } = useCommand<CounterInformationData[] | null>();

  useEffect(() => {
    const counterInformationRequestModel = new CounterInformationRequestModel(
      authUser
    );
    counterInformationRequestModel.AccountNo = '';

    getCounterInformationExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/MFSAPI/GetAGMAttendenceReport',
      JSON.stringify(counterInformationRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  }, []);

  const getCollectionAccounts = (AccountNo: any) => {
    const counterInformationRequestModel = new CounterInformationRequestModel(
      authUser
    );

    counterInformationRequestModel.AccountNo = AccountNo;

    getCounterInformationExecuteCommand(
      process.env.REACT_APP_BASE_URL + '/MFSAPI/GetAGMAttendenceReport',
      JSON.stringify(counterInformationRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };

  return (
    <>
      <LoaderDialogue isLoading={isCounterInformationResponseDataLoaded} />
      <FailedDialogue
        dialogueSize={Size.Small}
        isDialogueOpen={
          counterInformationResponseStatus === 'success' &&
          CounterInformationResponseData &&
          CounterInformationResponseData.length === 0
            ? true
            : false
        }
        cancelButtonText="ok"
        onCloseButtonClick={() => {
          setCounterInformationResponseStatus(null);
        }}
      >
        {counterInformationResponseMessage}
      </FailedDialogue>
      <motion.div
        initial="initial"
        animate="animate"
        transition={MyTransition.StaggerChildren.Fast}
      >
        <div className="w-full">
          <div className=" grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="flex w-full rounded-md bg-surface p-7 shadow"
            >
              <div className="w-full">
                <h2 className="text-center text-lg font-bold">
                  AGM Counter Information
                </h2>

                <ul className="mt-6 w-full divide-y overflow-hidden text-justify">
                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                    <div className="w-full text-left md:w-1/2">Name</div>
                    <div className="w-full text-right md:w-1/2">
                      {CounterInformationResponseData?.[0]?.FullName}
                    </div>
                  </li>

                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                    <div className="w-full text-left md:w-1/2">Counter No</div>
                    <div className="w-full text-right md:w-1/2">
                      {CounterInformationResponseData?.[0]?.CounterNo.replace(
                        /\D/g,
                        ''
                      )}
                    </div>
                  </li>
                  <li className="flex w-full items-center p-2 transition-colors duration-300 hover:bg-backgroundVariant">
                    <div className="w-full text-left md:w-1/2">
                      Counter Location
                    </div>
                    <div className="w-full text-right md:w-1/2">
                      {CounterInformationResponseData?.[0]?.LocationName}
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div
              variants={MyVariants.SlideInFromRight}
              transition={MyTransition.Spring.Low}
              className="flex w-full items-center justify-center rounded-md bg-surface p-7 shadow"
            >
              <div className="w-full">
                <h2 className="mb-3 text-center text-lg font-bold">
                  Find Counter
                </h2>
                <div className="relative w-full">
                  <MySearchInput
                    name="Account Number"
                    label="Account Number"
                    id="Account Number"
                    disabled={false}
                    value={CounterInformationState.AccountNo}
                    error={CounterInformationState?.Errors?.AccountNo}
                    onChange={(event) => {
                      updateCounterInformationState(
                        'AccountNo',
                        event.target.value
                      );
                    }}
                    onSubmit={() => {
                      getCollectionAccounts(CounterInformationState?.AccountNo);
                    }}
                    leftIcon={<i className="fa-solid fa-magnifying-glass"></i>}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
export default AgmCounter;
