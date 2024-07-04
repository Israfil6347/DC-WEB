import { useState } from 'react';
import { validateCollectionLedgerState } from '../validation/validateCollectionLedgerState';
import { TransferCollectionLedgerModel } from '../data/TransferCollectionLedgerModel';

export interface CollectionLedgerState {
  AccountNumber: string;
  AccountNo: string;
  AccountTypeName: string;
  AccountTypeCode: string;
  LedgerId: number;
  Amount: number;
  AccountId: number;
  PlType: number;
  AccountFor?: string;
  isSelected: boolean;
  Balance: number;
  DCAccountNo: string;
  UserId: number;
  WithdrawableBalance: number;
  IsDefaulter?: boolean;
  Errors: {
    AccountNumber: string;
    AccountNo: string;
    AccountType: string;
    LedgerId: string;
    Amount: string;
    AccountId: string;
    AccountTypeCode: string;
    PlType: string;
    AccountFor?: string;
    isSelected?: string;
    Balance: string;
    DCAccountNo: string;
    UserId: string;
    WithdrawableBalance: string;
    IsDefaulter?: boolean;
  } | null;
}

function useCollectionLedgerState() {
  const [collectionLedgerState, setCollectionLedgerState] = useState<
    CollectionLedgerState[] | []
  >([]);

  const updateCollectionLedgerState = (
    fieldName: string,
    fieldValue: any,
    index: number
  ) => {
    collectionLedgerState[index] = {
      ...collectionLedgerState[index],
      [fieldName]: fieldValue,
      Errors: {
        ...collectionLedgerState[index].Errors!,
        [fieldName]: validateCollectionLedgerState(
          fieldName,
          fieldValue,
          collectionLedgerState[index]
        ),
      },
    };
    setCollectionLedgerState([...collectionLedgerState]);
  };

  const initCollectionLedgerState = (
    collectionLedgers: TransferCollectionLedgerModel[]
  ) => {
    if (collectionLedgers !== null) {
      var tempCollectionLedgers: CollectionLedgerState[] = [];
      collectionLedgers?.forEach((element) => {
        var modifiedObj: CollectionLedgerState = {
          ...element,
          Amount: element.Amount || 0,
          PlType: element.PlType || 1,

          Errors: {
            AccountNumber: '',
            AccountNo: '',
            AccountType: '',
            LedgerId: '',
            Amount: '',
            AccountId: '',
            AccountTypeCode: '',
            PlType: '',
            AccountFor: '',
            isSelected: '',
            Balance: '',
            DCAccountNo: '',
            UserId: '',
            WithdrawableBalance: '',
          },
          isSelected: true, // Provide a default value for isSelected
        };

        tempCollectionLedgers.push(modifiedObj);
      });

      setCollectionLedgerState([...tempCollectionLedgers]);
    }
  };

  return {
    collectionLedgerState,
    setCollectionLedgerState,
    initCollectionLedgerState,
    updateCollectionLedgerState,
  };
}

export default useCollectionLedgerState;
