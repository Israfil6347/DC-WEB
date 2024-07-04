// @ts-nocheck
import CardPage from 'authenticated_pages/info/financial_card/CardPage';
import { motion } from 'framer-motion';
import MyButton from 'global_shared/components/MyButton';
import LoaderDialogue from 'global_shared/components/dialogues/LoaderDialogue';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import useCommand from 'global_shared/hooks/useCommand';
import { CardHandler } from 'global_shared/model/data/CardHandler';
import { useContext, useState } from 'react';
import MyProductLoanDetails from './components/product_loan_application/MyProductLoanDetails';
import { GetEligibleCollateralRequestModel } from './model/request/GetEligibleCollateralRequestModel';
import { CollateralAccountResponseModel } from './model/response/CollateralAccountResponseModel';

/**========================================================================
 * ?                                ABOUT
 * @author         :  name_on_card
 * @designation    :  Software Developer
 * @email          :  newtonmitro@gmail.com
 * @description    :
 * @createdOn      :  01 July 2023
 * @updatedBy      :  Israfil
 * @updatedOn      :  02 July 2023
 *========================================================================**/
const AccordionAnimation = {
  closed: { opacity: 0, height: 0 },
  open: { opacity: 1, height: 'auto' },
};
interface MyProductLoanItemProps {
  loan: any;
  personalCardInfoResponseData: any;
  EligibilityData: any;
}

const MyProductLoanItem: React.FC<MyProductLoanItemProps> = ({
  loan,
  personalCardInfoResponseData,
  EligibilityData,
}) => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const {
    loading: eligibleCollateralACCListResponseDataLoading,
    data: eligibleCollateralACCListResponseData,
    setData: setEligibleCollateralACCListData,
    status: eligibleCollateralACCListStatus,
    setStatus: setEligibleCollateralACCListStatus,
    executeCommand: eligibleCollateralACCListResponseDataExecuteCommand,
  } = useCommand<CollateralAccountResponseModel | null>();

  var card: CardHandler = new CardHandler([]);
  if (personalCardInfoResponseData !== null) {
    card = new CardHandler(personalCardInfoResponseData);
  }

  const ProductLoanDetailsHandler = (productCode) => {
    const baseRequestEligibleCollateral = new GetEligibleCollateralRequestModel(
      authUser
    );

    baseRequestEligibleCollateral.ProductCode = productCode;

    eligibleCollateralACCListResponseDataExecuteCommand(
      process.env.REACT_APP_BASE_URL +
        '/loans_v1/getEligibleCollateralAccounts',
      JSON.stringify(baseRequestEligibleCollateral),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };
  const JSONEligibilityData = JSON.parse(EligibilityData);

  if (card?.getHandledCard().length === 0) {
    return <CardPage />;
  } else {
    return (
      <>
        <LoaderDialogue
          isLoading={eligibleCollateralACCListResponseDataLoading}
        />
        <MyProductLoanDetails
          loanDetails={
            eligibleCollateralACCListStatus === 'success' ? true : false
          }
          loanDetailsModel={loan}
          closeLoanDetails={() => {
            setEligibleCollateralACCListStatus(false);
          }}
          personalCardInfoResponseData={personalCardInfoResponseData}
          eligibleCollateralACCListResponseData={
            eligibleCollateralACCListResponseData!
          }
        />

        {/* <div
          onClick={() => {
           
          }}
        >
          <div
            className={`flex items-center rounded-md border  bg-surface p-4 text-onBackground hover:cursor-pointer hover:shadow md:p-8 ${
              loan.IsDefaulter ? 'border-error bg-surface' : 'bg-surface'
            }  hover:animate-twPulse  rounded p-4 hover:shadow-sm`}
          >
            <i className="fa-solid fa-sack-dollar fill-primary  text-3xl"></i>

            <span className="ml-2 block">{loanType}</span>
          </div>
        </div> */}

        <div className="w-full rounded bg-surface p-6">
          <div className="flex w-full justify-between" onClick={toggleExpand}>
            <p
              className="text-lg font-bold hover:cursor-pointer"
              id={`LoanProductName`}
            >
              {loan?.LoanProductName}
            </p>
            <div
              className={`fa-solid ${expand ? 'fa-sort-up' : 'fa-sort-down'}`}
            ></div>
          </div>
          <motion.div
            initial="closed"
            animate={expand ? 'open' : 'closed'}
            exit="closed"
            variants={AccordionAnimation}
            transition={{ duration: 0.5 }}
            className="ease overflow-hidden  text-justify font-medium"
          >
            <div className="pt-4">
              <table className="table w-full">
                <thead className="">
                  <tr className="sticky -top-0 hidden h-16 w-full bg-surface text-sm uppercase text-onSurface shadow-sm md:table-row">
                    <th className="border border-gray-200 p-2 text-left">
                      <p className="p-2 md:p-0"> Account</p>
                    </th>
                    <th className="border border-gray-200 p-2 text-left">
                      <p className="p-2 md:p-0">Findings</p>
                    </th>

                    <th className="border border-gray-200 p-2 text-left">
                      <p className="p-2 md:p-0">Eligible</p>
                    </th>
                  </tr>
                </thead>
                <tbody className="flex-1 bg-backgroundVariant sm:flex-none ">
                  {JSONEligibilityData?.map((item: any, index: any) => (
                    <tr className="JSONEligibilityData my-3 flex w-full flex-col flex-wrap border border-t border-gray-700 first:border-t-0 even:bg-red-50 md:my-0 md:table-row">
                      <td className="border border-gray-200 p-2 text-left">
                        <label className="p-2 md:hidden md:p-0" htmlFor="">
                          Account
                        </label>
                        <p
                          className="p-2 font-semibold md:p-0 md:font-normal"
                          id={`DepositAccountNo_${index}`}
                        >
                          {item?.DepositAccountNo}
                        </p>
                      </td>
                      <td className="border border-gray-200 p-2 text-left">
                        <label className="p-2 md:hidden md:p-0" htmlFor="">
                          Findings
                        </label>
                        <div>
                          <ul>
                            <li className="flex items-center ">
                              <span className="px-2">
                                {item.CollareralEligible ? (
                                  <i className="fa-solid fa-check text-2xl font-bold text-success"></i>
                                ) : (
                                  <i className="fa-solid fa-xmark text-2xl font-bold text-error"></i>
                                )}
                              </span>
                              <p> Collateral covered.</p>
                            </li>
                            {item?.HasCertificate ? (
                              <li className="flex items-center ">
                                <span className="px-2">
                                  {item.IsCertificateSubmitted ? (
                                    <i className="fa-solid fa-check text-2xl font-bold text-success"></i>
                                  ) : (
                                    <i className="fa-solid fa-xmark text-2xl font-bold text-error"></i>
                                  )}
                                </span>
                                <p>Certificate Submitted.</p>
                              </li>
                            ) : (
                              ''
                            )}

                            <li className="flex items-center ">
                              <span className="px-2">
                                {item.IsFamilyDefaulter ? (
                                  <i className="fa-solid fa-xmark text-2xl font-bold text-error "></i>
                                ) : (
                                  <i className="fa-solid fa-check text-2xl font-bold  text-success"></i>
                                )}
                              </span>
                              <p> Family loan regular.</p>
                            </li>
                            <li className="flex items-center ">
                              <span className="px-2">
                                {item.IsSelfDefaulter ? (
                                  <i className="fa-solid fa-xmark text-2xl font-bold text-error"></i>
                                ) : (
                                  <i className="fa-solid fa-check text-2xl font-bold text-success"></i>
                                )}
                              </span>
                              <p> Self loan regular.</p>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td className="border border-gray-200 p-2 text-left">
                        <label className="p-2 md:hidden md:p-0" htmlFor="">
                          Eligible
                        </label>
                        <p className="p-2 font-semibold md:p-0 md:font-normal">
                          {item?.IsEligible ? (
                            <i className="fa-solid fa-check text-2xl font-bold text-success"></i>
                          ) : (
                            <i className="fa-solid fa-xmark text-2xl font-bold text-error"></i>
                          )}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center pt-3">
              <MyButton
                type="button"
                label="Apply"
                disabled={loan?.IsEligible ? false : true}
                onClick={() => {
                  ProductLoanDetailsHandler(loan?.LoanProductCode);
                }}
                styleClass=" w-2/8 rounded bg-primary px-7 ml-5 py-3 text-sm font-medium uppercase text-onPrimary hover:bg-primaryVariant shadow-md transition duration-150 hover:scale-105 active:shadow-lg "
                name={''}
                id="applyLoan"
              />
            </div>
          </motion.div>
        </div>
      </>
    );
  }
};

export default MyProductLoanItem;
