import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import MyCard from 'global_shared/components/MyCard';
import { RoundedClass } from 'global_shared/enum/RoundedClass';
import { Size } from 'global_shared/enum/Size';
import { PersonDependentAccountModel } from 'authenticated_pages/accounts/my_accounts/model/data/AccountStatementModel';
import { PersonDependentAccountRequestModel } from '../model/request/PersonDependentAccountRequestModel';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import useCommand from 'global_shared/hooks/useCommand';
import { useNavigate } from 'react-router-dom';
interface DependentListProps {
  personDependentAccountResponseData: PersonDependentAccountModel[] | null;
}

const AccordionAnimation = {
  closed: { opacity: 0, height: 0 },
  open: { opacity: 1, height: 'auto' },
};

const DependentList: React.FC<DependentListProps> = ({
  personDependentAccountResponseData,
}) => {
  const [expand, setExpand] = useState(false);
  const [expandClickItem, setExpandClickItem] = useState('');
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const toggleExpand = (productCode: any) => {
    setExpand(!expand);
    setExpandClickItem(productCode);
    GetAccountListHandler(productCode);
  };
  const {
    loading: personDependentAccountResponseDataLoading,
    data: personDependentAccountListResponseData,
    message: personDependentAccountResponseMessage,
    status: personDependentAccountResponseStatus,
    setStatus: setPersonDependentAccountResponseStatus,
    executeCommand: getPersonDependentAccountRequestExecuteCommand,
  } = useCommand<PersonDependentAccountModel[] | null>();

  useEffect(() => {}, [personDependentAccountListResponseData]);

  const GetAccountListHandler = (productCode: any) => {
    const personDependentAccountRequestModel =
      new PersonDependentAccountRequestModel(authUser);
    personDependentAccountRequestModel.DependentPersonId =
      parseInt(productCode);
    personDependentAccountRequestModel.UserName = authUser.Email;

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
  };
  return (
    <div>
      <motion.div
        initial="initial"
        animate="animate"
        transition={MyTransition.StaggerChildren.Fast}
        className="w-full"
      >
        <div className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2">
          {personDependentAccountResponseData?.map((obj: any, index: any) => (
            <div
              className="personDependentAccount"
              onClick={() => {
                toggleExpand(obj.DependentPersonId);
              }}
            >
              <MyCard
                rounded={RoundedClass.Medium}
                shadow={Size.Small}
                bgColor={'bg-background'}
                minimumHeight={80}
                styleClass="z-10"
              >
                <div className={`group cursor-pointer p-4`}>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="flex flex-col items-center justify-center">
                        <i className="fa-solid fa-piggy-bank text-3xl text-primary"></i>
                      </div>
                      <div className="ml-4 grow text-left ">
                        <h2
                          className="font-semibold"
                          id={`AccountHolderName_${index}`}
                        >
                          {obj?.AccountHolderName}
                        </h2>
                        <span
                          className="text-sm capitalize"
                          id={`accountType_${index}`}
                        >
                          {obj?.obj?.accountType}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`fas text-lg ${
                          expand && expandClickItem === obj.DependentPersonId
                            ? 'fa-solid fa-caret-up'
                            : 'fa-solid fa-caret-down'
                        }`}
                      ></div>
                    </div>
                  </div>
                  <motion.div
                    initial="closed"
                    animate={
                      expand && expandClickItem === obj.DependentPersonId
                        ? 'open'
                        : 'closed'
                    }
                    exit="closed"
                    variants={AccordionAnimation}
                    transition={{ duration: 0.5 }}
                    className={`ease overflow-hidden text-justify`}
                  >
                    {personDependentAccountListResponseData?.map(
                      (obj: any, index: number) => (
                        <div className="personDependentAccountList grid grid-cols-1  py-3">
                          <div className=" rounded bg-surface p-2 duration-300 hover:-translate-y-1 hover:scale-110">
                            <div className="flex justify-center">
                              <h2 id={`AccountTypeName_${index}`}>
                                {obj.AccountTypeName}
                              </h2>
                            </div>
                            <div className="flex justify-center">
                              <span
                                className="text-sm"
                                id={`AccountNo${index}`}
                              >
                                ({obj.AccountNo})
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </motion.div>
                </div>
              </MyCard>
            </div>
          ))}
          {/* {personDependentAccountResponseData?.map((obj: any, key: any) => (
          <div
            className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2"
            onClick={() => {
              navigate(`${obj.DependentPersonId}`);
            }}
          >
            <MyCard
              rounded={RoundedClass.Medium}
              shadow={Size.Small}
              bgColor={'bg-background'}
              minimumHeight={80}
            >
              <div className={`group flex cursor-pointer items-center p-4`}>
                <div className="flex flex-col items-center justify-center">
                  <i className="fa-solid fa-piggy-bank text-3xl text-primary"></i>
                </div>
                <div className="">
                  <ul>
                    <li className="ml-4 grow text-left font-semibold">
                      {obj?.AccountHolderName}
                    </li>
                  </ul>
                </div>

                <br />
                <p></p>
              </div>
            </MyCard>
          </div>
        ))} */}
        </div>
      </motion.div>
    </div>
  );
};

export default DependentList;
