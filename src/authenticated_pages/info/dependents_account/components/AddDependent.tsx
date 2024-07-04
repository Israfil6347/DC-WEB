// @ts-nocheck
import { PersonDependentAccountModel } from 'authenticated_pages/accounts/my_accounts/model/data/AccountStatementModel';
import { FamilyAndRelativeViewModel } from 'authenticated_pages/info/family_and_relatives/model/data/FamilyAndRelativeViewModel';
import { NewMenuRequestModel } from 'authenticated_pages/shared/model/request/NewMenuRequestModel';
import MyButton from 'global_shared/components/MyButton';
import MyDropdown from 'global_shared/components/MyDropdown';
import MyTextInput from 'global_shared/components/MyTextInput';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import useAuthUserAndMenu from 'global_shared/hooks/useAuthUserAndMenu';
import useCommand from 'global_shared/hooks/useCommand';
import React, { useContext, useEffect } from 'react';
import { validateAddDependantState } from '../validation/validateAddDependantState';

interface AddDependentListProps {
  UpdateAddDependantState: any;
  addDependantState: any;
  AddDependentHandler: any;
  getFamilyAndRelativesResponseData: FamilyAndRelativeViewModel[] | null;
  GetAccountListHandler: any;
  personDependentAccountListResponseData: PersonDependentAccountModel[] | null;
}
const AddDependent: React.FC<AddDependentListProps> = ({
  UpdateAddDependantState,
  addDependantState,
  getFamilyAndRelativesResponseData,
  AddDependentHandler,
  GetAccountListHandler,
  personDependentAccountListResponseData,
}) => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const { GetMenu } = useAuthUserAndMenu();

  const { executeCommand: newMenuRequestCommand } = useCommand<any>();
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

  const DependentListAccount = (personDependentAccountListResponseData || [])
    .map((obj, index) => {
      if (!obj?.HasOperator) {
        return {
          id: index,
          label: obj.AccountNo || '',
          value: obj.AccountHolderInfoId || '',
          MobileNumber: obj.MobileNumber || '',
        };
      }
      return '';
    })
    .filter(Boolean);

  const DependentAccountHandler = (event: any) => {
    const selected = DependentListAccount?.find((obj: any) => {
      if (parseInt(event.target.value) === obj?.value)
        return {
          value: obj?.value,
          label: obj?.label,
          MobileNumber: obj.MobileNumber || '',
        };
    });

    UpdateAddDependantState(event.target.name, event.target.value);
    if (selected) {
      UpdateAddDependantState('MobileNumber', selected.MobileNumber || '');
    }
  };

  useEffect(() => {
    if (FamilyAndRelatives?.length === 1) {
      UpdateAddDependantState(
        'Dependent',
        FamilyAndRelatives?.[0]?.value.toString()
      );
      GetAccountListHandler(FamilyAndRelatives?.[0]?.value);
    }
  }, [getFamilyAndRelativesResponseData]);

  useEffect(() => {
    if (DependentListAccount.length === 1) {
      if (
        typeof DependentListAccount[0] !== 'string' &&
        DependentListAccount[0]?.MobileNumber !== undefined
      ) {
        UpdateAddDependantState(
          'dependentAccounts',
          DependentListAccount[0]?.value.toString() || ''
        );
        UpdateAddDependantState(
          'MobileNumber',
          DependentListAccount[0]?.MobileNumber || ''
        );
      }
    }
  }, [personDependentAccountListResponseData]);

  const isNewMenuHandler = () => {
    const getMenu = GetMenu('Add Dependent');

    const newMenuRequestModel = new NewMenuRequestModel(authUser);
    newMenuRequestModel.MenuID = getMenu?.MenuId;

    if (getMenu?.MenuId && getMenu?.IsNewMenu) {
      newMenuRequestCommand(
        process.env.REACT_APP_BASE_URL + '/others_v1/AddMenuWitness',
        JSON.stringify(newMenuRequestModel),
        {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
        }
      );
    }
  };

  return (
    <div>
      <div className="">
        <h2 className="flex items-center justify-center p-4  text-xl font-bold uppercase text-primary">
          Add Dependent
        </h2>
        <div>
          <div className="relative my-6 w-full px-7">
            <MyDropdown
              name="Dependent"
              id="DependentId"
              value={addDependantState?.Dependent}
              label="Dependent"
              disabled={false}
              dropDownData={FamilyAndRelatives?.map(
                (obj: any, index: number) => {
                  return {
                    id: index,
                    label: obj?.label!,
                    value: obj?.value!,
                  };
                }
              )}
              error={addDependantState?.Errors?.Dependent}
              onChange={(event) => {
                UpdateAddDependantState(event.target.name, event.target.value);
                GetAccountListHandler(event.target.value);
              }}
              required={true}
              leftIcon={<i className="fa-solid fa-people-arrows"></i>}
            />
          </div>
          {DependentListAccount.length === 0 ? (
            <div className={`  text-center`}>
              <span className=" text-sm font-extrabold text-error ">
                {addDependantState?.Dependent === ''
                  ? 'Please select dependent'
                  : 'The selected user accounts assigned as dependent.'}
              </span>
            </div>
          ) : (
            <div className={`relative my-6 w-full px-7 `}>
              <MyDropdown
                name="dependentAccounts"
                id="dependentAccountsId"
                value={addDependantState?.dependentAccounts}
                label="Dependent Accounts"
                disabled={false}
                dropDownData={DependentListAccount?.map(
                  (obj: any, index: number) => {
                    return {
                      id: index,
                      label: obj?.label!,
                      value: obj?.value!,
                    };
                  }
                )}
                onChange={DependentAccountHandler}
                error={addDependantState?.Errors?.dependentAccounts}
                required={true}
                leftIcon={<i className="fa-solid fa-piggy-bank"></i>}
              />
            </div>
          )}

          <div className="relative my-6 w-full px-7">
            <MyTextInput
              label={'Mobile Number'}
              name={'MobileNumber'}
              disabled={true}
              value={addDependantState?.MobileNumber}
              inputType={'text'}
              error={addDependantState?.Errors?.MobileNumber}
              onChangeHandler={function (): void {
                throw new Error('Function not implemented.');
              }}
              leftIcon={<i className="fa-solid fa-phone-volume"></i>}
            />
          </div>
        </div>

        <div className=" bottom-0  w-full rounded  pb-8 text-center ">
          <MyButton
            type="button"
            label="Add Dependent"
            disabled={false}
            name={''}
            onClick={() => {
              var error = '';
              const { Dependent, dependentAccounts, MobileNumber } =
                addDependantState;
              const cardFields = {
                Dependent,
                dependentAccounts,
                MobileNumber,
              };
              let fieldName: keyof typeof cardFields;

              for (fieldName in cardFields) {
                UpdateAddDependantState(fieldName, cardFields[fieldName]);

                error =
                  error +
                  validateAddDependantState(fieldName, cardFields[fieldName]);
              }
              if (error.length === 0) {
                AddDependentHandler();
                isNewMenuHandler();
              }
              isNewMenuHandler();
            }}
            styleClass=" md:w-1/3 rounded border relative bg-primary p-2 font-semibold uppercase text-onPrimary hover:scale-105"
          >
            {GetMenu('Add Dependent')?.IsNewMenu ? (
              <div className="absolute bottom-2 -left-6 animate-bounce p-2 text-red-600">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20.000000pt"
                  height="20.000000pt"
                  viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#FF0000"
                    stroke="none"
                  >
                    <path
                      d="M2564 5074 c-16 -22 -126 -178 -244 -347 -136 -194 -221 -306 -230
                        -304 -8 1 -188 91 -398 200 -211 110 -386 197 -388 194 -3 -2 -15 -203 -28
                        -446 -13 -243 -26 -444 -28 -447 -3 -2 -201 -15 -442 -28 -240 -13 -438 -25
                        -441 -28 -2 -2 67 -188 155 -412 88 -225 162 -417 165 -426 5 -15 -52 -53
                        -297 -201 -167 -100 -320 -193 -341 -206 l-39 -24 350 -263 350 -262 -173
                        -369 c-95 -204 -171 -372 -169 -375 3 -2 199 -25 435 -51 237 -26 432 -49 433
                        -51 2 -2 13 -201 26 -443 12 -242 23 -441 24 -442 1 -1 183 84 405 188 221
                        104 406 187 410 185 4 -3 126 -162 271 -355 146 -193 267 -350 270 -350 4 0
                        413 610 472 702 4 6 152 -61 378 -172 205 -100 374 -180 376 -179 1 2 17 201
                        34 443 18 242 33 441 34 442 0 1 198 5 439 9 240 4 437 8 437 8 0 1 -70 162
                        -155 357 -85 194 -156 359 -158 365 -1 7 135 134 303 284 168 151 306 276 308
                        279 1 4 -146 126 -327 271 -182 146 -330 270 -330 275 -1 6 93 174 209 374
                        115 201 208 366 206 368 -2 2 -205 22 -452 44 -246 21 -448 40 -449 42 -1 1
                        -19 197 -41 435 -21 237 -41 432 -45 432 -3 0 -176 -81 -384 -181 -207 -99
                        -378 -179 -379 -177 -2 2 -115 149 -252 327 -137 179 -254 332 -260 340 -9 12
                        -16 8 -40 -25z m1277 -1716 c0 -35 6 -198 13 -363 7 -165 10 -303 7 -306 -3
                        -4 -48 -20 -98 -37 l-93 -31 -73 107 c-41 59 -96 144 -123 189 -26 45 -50 81
                        -51 79 -2 -1 1 -27 7 -57 9 -49 30 -307 30 -369 0 -24 -8 -28 -87 -54 -49 -16
                        -93 -31 -99 -33 -10 -4 -424 567 -424 585 0 4 45 24 101 42 l101 35 17 -24 c9
                        -13 67 -112 130 -220 62 -108 111 -185 108 -171 -3 14 -13 102 -21 195 -9 94
                        -18 197 -21 231 l-6 61 71 27 c39 14 78 26 85 26 15 0 124 -157 225 -323 29
                        -48 55 -86 57 -83 2 2 -3 41 -12 87 -17 95 -56 391 -52 396 4 4 190 72 200 72
                        4 1 7 -27 8 -61z m-1722 -761 c85 -243 156 -447 158 -453 3 -7 -40 -27 -106
                        -49 l-111 -37 -177 159 c-97 87 -226 205 -287 263 -60 58 -106 96 -102 85 115
                        -298 227 -619 218 -626 -4 -4 -47 -21 -95 -38 -74 -26 -89 -28 -94 -16 -3 9
                        -74 212 -159 452 -112 319 -150 439 -141 445 31 19 228 79 239 72 35 -21 345
                        -300 436 -392 56 -57 102 -102 102 -99 0 2 -14 35 -31 72 -44 97 -203 535
                        -197 540 7 5 174 64 183 64 6 1 79 -198 164 -442z m618 364 c52 -26 116 -95
                        147 -156 24 -49 52 -143 45 -149 -2 -2 -94 -35 -204 -73 -130 -45 -200 -74
                        -200 -83 0 -8 16 -25 35 -38 30 -20 44 -23 95 -19 63 5 146 35 205 74 19 13
                        39 23 45 23 6 0 27 -29 46 -65 l34 -66 -25 -20 c-38 -30 -199 -105 -252 -118
                        -134 -32 -235 -5 -324 83 -83 84 -109 153 -109 291 0 90 3 105 28 152 46 89
                        114 144 222 180 54 18 163 10 212 -16z"
                    />
                    <path
                      d="M2523 2815 c-17 -7 -39 -27 -47 -44 -16 -31 -22 -111 -8 -111 8 0
                                214 71 221 77 10 7 -26 58 -54 75 -35 21 -68 22 -112 3z"
                    />
                  </g>
                </svg>
              </div>
            ) : (
              ''
            )}
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default AddDependent;
