import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import { useContext, useEffect } from 'react';

import useCommand from 'global_shared/hooks/useCommand';
import OpenAccountItem from './OpenAccountItem';
import { AccountInfoRequestModel } from './model/request/AccountInfoRequestModel';
import LoaderDialogue from 'global_shared/components/dialogues/LoaderDialogue';

/**========================================================================
 * ?                                ABOUT
 * @author         :  name_on_card
 * @designation    :  Software Developer
 * @email          :  newtonmitro@gmail.com
 * @description    :
 * @createdOn      :  01 July 2023
 * @updatedBy      :  Israfil
 * @updatedOn      :  04 July 2023
 *========================================================================**/

function OpenAccountsPage() {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

  const {
    loading: accountInfoResponseDataLoading,
    data: accountInfoResponseData,
    executeCommand: accountInfoRequestExecuteCommand,
  } = useCommand<string | any>();

  useEffect(() => {
    var accountInfoRequestModel = new AccountInfoRequestModel(authUser);

    accountInfoRequestModel.IsOnlineApplicable = true;
    accountInfoRequestModel.ProductType = -1;
    accountInfoRequestModel.ProductCode = '-1';
    accountInfoRequestModel.RolePermissionId = '6,1,1210';

    accountInfoRequestExecuteCommand(
      process.env.REACT_APP_BASE_URL +
        '/Accounts_V1/getApplicableDepositAccountTypes',
      JSON.stringify(accountInfoRequestModel),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  }, []);

  return (
    <>
      <LoaderDialogue isLoading={accountInfoResponseDataLoading} />
      <div className=" grid grid-cols-1">
        <div className="rounded">
          <div className="">
            <motion.div
              initial="initial"
              animate="animate"
              transition={MyTransition.StaggerChildren.Fast}
              className={`grid h-full grid-cols-1 gap-3 text-onSurface md:grid-cols-2 lg:grid-cols-3
             
              `}
            >
              {accountInfoResponseData?.map((obj: any, key: any) => (
                <motion.div
                  variants={MyVariants.SlideInFromRight}
                  transition={{ ...MyTransition.Spring.Low, delay: 0.1 * key }}
                  key={key}
                  id={`accountInfo_${key}}`}
                  className="accountInfo"
                >
                  <OpenAccountItem obj={obj} key={key} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {/* <motion.div
        initial="initial"
        animate="animate"
        transition={MyTransition.StaggerChildren.Fast}
      >
        <div className="bg-surface">
          <section className="flex flex-col-reverse items-start gap-6 text-justify md:flex-row">
            <div className="w-full">
              <div className="">
                <div className="bg-surface  px-4 text-primary shadow-sm">
                  <div className="py-28 text-center">
                    <motion.h1
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className="text-3xl font-extrabold uppercase"
                    >
                      Open An Account
                    </motion.h1>
                    <motion.p
                      variants={MyVariants.SlideInFromRight}
                      transition={MyTransition.Spring.Low}
                      className=""
                    >
                      Thank you for showing your interest in us, We are going to
                      implement account opening application feature very soon.
                      Please stay connected with us.
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </motion.div> */}
    </>
  );
}

export default OpenAccountsPage;
