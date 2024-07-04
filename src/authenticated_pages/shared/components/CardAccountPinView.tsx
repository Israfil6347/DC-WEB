import { CardModel } from 'authenticated_pages/info/financial_card/model/data/CardModel';
import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import MyDropdown from 'global_shared/components/MyDropdown';
import MyPasswordInput from 'global_shared/components/MyPasswordInput';
import MyTextInput from 'global_shared/components/MyTextInput';
import { CardHandler } from 'global_shared/model/data/CardHandler';
import { ChangeEvent, useEffect } from 'react';

interface CardAccountPinViewProps {
  showAccountInfo: boolean;
  showAccountInfoCardNo?: boolean;
  titleAccounts?: string;
  showCardInfo: boolean;
  titleCard?: string;
  styleClasses?: string;
  myCards: CardModel[] | null;
  // parentPageState: DepositRequestState;
  parentPageState: any;
  updateParentPageState: (fieldName: string, fieldValue: any) => void;
}

const CardAccountPinView: React.FC<CardAccountPinViewProps> = ({
  showAccountInfo,
  titleAccounts,
  showCardInfo,
  titleCard,
  showAccountInfoCardNo,
  myCards,
  styleClasses = 'p-7',
  parentPageState,
  updateParentPageState,
}) => {
  var card: CardHandler | null = null;
  if (myCards !== null) {
    card = new CardHandler(myCards);
  }

  useEffect(() => {
    if (
      card?.cardModel?.[0]?.CardsAccounts &&
      card?.cardModel?.[0]?.CardsAccounts.length === 1
    ) {
      updateParentPageState(
        'CardAccount',
        card?.cardModel?.[0]?.CardsAccounts?.[0]?.AccountNumber
      );

      updateParentPageState(
        'Balance',
        card?.cardModel?.[0]?.CardsAccounts?.[0]?.Balance
      );
      updateParentPageState(
        'WithdrawableBalance',
        card?.cardModel?.[0]?.CardsAccounts?.[0]?.WithdrawableBalance
      );
      updateParentPageState(
        'AccountTypeName',
        card?.cardModel?.[0]?.CardsAccounts?.[0]?.AccountTypeName
      );
    }
    updateParentPageState('CardNo', card?.cardModel?.[0]?.CardNo);
  }, [card?.cardModel?.[0]?.CardsAccounts, card?.cardModel]);

  return (
    <div className="flex items-center justify-center bg-surface">
      <motion.div
        variants={MyVariants.SlideInFromRight}
        transition={MyTransition.Spring.Low}
        className={`  w-full  rounded-md  ${styleClasses}`}
      >
        {!showAccountInfo ? (
          ''
        ) : (
          <div className="mb-4 w-full">
            <motion.h2 className="text-center text-lg font-bold">
              {titleAccounts}
            </motion.h2>
            <div className="mt-6 space-y-4">
              <MyDropdown
                label="Select Account"
                name="AccountTypeName"
                id="AccountTypeName"
                required={true}
                disabled={false}
                // value={`${parentPageState.AccountTypeName} ${parentPageState?.CardAccount}`}
                value={parentPageState?.CardAccount}
                error={parentPageState?.Errors?.AccountTypeName}
                dropDownData={card?.cardModel?.[0]?.CardsAccounts?.map(
                  (obj, index) => {
                    return {
                      value: obj?.AccountNumber?.trim(),
                      label: obj?.AccountTypeName?.trim(),
                    };
                  }
                )}
                onChange={(event) => {
                  const selected = card?.cardModel?.[0]?.CardsAccounts?.find(
                    (obj) => {
                      if (
                        event.target.value === obj?.AccountNumber.toString()
                      ) {
                        return {
                          value: obj?.AccountNumber,
                          label: obj?.AccountTypeName,
                        };
                      }
                    }
                  );

                  updateParentPageState(
                    'AccountTypeName',
                    selected?.AccountTypeName
                  );
                  updateParentPageState('Balance', selected?.Balance);
                  updateParentPageState(
                    'WithdrawableBalance',
                    selected?.WithdrawableBalance
                  );
                  updateParentPageState('CardAccount', selected?.AccountNumber);
                  updateParentPageState('AccType', selected?.AccountTypeCode);
                }}
                leftIcon={<i className="fa-regular fa-credit-card"></i>}
              />
              <span className="text-xs text-error">
                {card?.expiryDateHandler()}
              </span>

              <MyTextInput
                label={'Balance'}
                disabled={true}
                leftIcon={<i className="fa-solid fa-bangladeshi-taka-sign"></i>}
                name={'Balance'}
                id={'Balance'}
                inputType={'number'}
                // value={card?.cardModel?.[0]?.CardsAccounts?.[0]?.Balance.toString()}
                value={parentPageState?.Balance}
                onChangeHandler={function (
                  event: ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <MyTextInput
                label={'Withdrawable Balance'}
                disabled={true}
                leftIcon={<i className="fa-solid fa-bangladeshi-taka-sign"></i>}
                name={'WithdrawableBalance'}
                id={'WithdrawableBalance'}
                inputType={'number'}
                value={parentPageState?.WithdrawableBalance}
                // value={card?.cardModel?.[0]?.CardsAccounts?.[0]?.WithdrawableBalance.toString()}
                onChangeHandler={function (
                  event: ChangeEvent<HTMLInputElement>
                ): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <div className={`${showAccountInfoCardNo ? 'block' : 'hidden'}`}>
                <MyDropdown
                  label="Selected Card"
                  name="CardNo"
                  id="CardNo"
                  required={true}
                  disabled={true}
                  value={parentPageState.CardNo}
                  error={
                    card?.getHandledCard()[0]?.IsLockCard
                      ? 'Your card is locked'
                      : parentPageState.Errors.CardNo
                  }
                  dropDownData={myCards?.map((obj, index) => {
                    return {
                      value: obj?.CardNo?.trim(),
                      label: obj?.CardNo?.trim(),
                    };
                  })}
                  onChange={(event) => {
                    updateParentPageState(
                      event.target.name,
                      event.target.value
                    );
                  }}
                  leftIcon={<i className="fa-regular fa-credit-card"></i>}
                />
                <span className="text-xs text-error">
                  {card?.expiryDateHandler()}
                </span>
              </div>
            </div>
          </div>
        )}
        {!showCardInfo ? (
          ''
        ) : (
          <div className="w-full">
            {titleCard && (
              <h2 className="py-3 text-center text-lg font-bold">
                {titleCard}
              </h2>
            )}
            <div className="mt-2 grid grid-cols-1 gap-3  md:grid-cols-1">
              {/* <div className="">
              <MyDropdown
                label="Account No"
                name="CardAccount"
                required={true}
                disabled={false}
                value={parentPageState.CardAccount}
                error={parentPageState.Errors.CardAccount}
                dropDownData={card?.cardModel?.[0]?.CardsAccounts?.map(
                  (obj, index) => {
                    return {
                      id: index,
                      value: obj?.AccountNumber?.trim(),
                      label: obj?.AccountNumber?.trim(),
                    };
                  }
                )}
                onChange={(event) => {
                  updateParentPageState(event.target.name, event.target.value);
                }}
                leftIcon={<i className="fa-solid fa-piggy-bank"></i>}
              />
            </div> */}
              <div>
                <MyDropdown
                  label="Selected Card"
                  name="CardNo"
                  id="CardNo"
                  required={true}
                  disabled={true}
                  value={parentPageState.CardNo}
                  error={
                    card?.getHandledCard()[0]?.IsLockCard
                      ? 'Your card is locked'
                      : parentPageState.Errors.CardNo
                  }
                  dropDownData={myCards?.map((obj, index) => {
                    return {
                      value: obj?.CardNo?.trim(),
                      label: obj?.CardNo?.trim(),
                    };
                  })}
                  onChange={(event) => {
                    updateParentPageState(
                      event.target.name,
                      event.target.value
                    );
                  }}
                  leftIcon={<i className="fa-regular fa-credit-card"></i>}
                />
                <span className="text-xs text-error">
                  {card?.expiryDateHandler()}
                </span>
              </div>
              <div>
                <MyPasswordInput
                  label="Card PIN"
                  name="CardPIN"
                  id="CardPIN"
                  disabled={false}
                  required={true}
                  value={parentPageState?.CardPIN}
                  error={parentPageState?.Errors?.CardPIN}
                  onChangeHandler={(event) => {
                    updateParentPageState(
                      event.target.name,
                      event.target.value
                    );
                  }}
                  leftIcon={<i className="fa-regular fa-credit-card"></i>}
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CardAccountPinView;
