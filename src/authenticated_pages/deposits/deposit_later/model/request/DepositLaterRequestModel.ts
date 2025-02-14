import { CollectionLedgerModel } from 'authenticated_pages/shared/model/data/CollectionLedgerModel';
import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class DepositLaterRequestModel extends BaseRequestModel {
  TransactionNumber: string;
  TransactionType: string;
  AccountHolderName: string;
  AccountNo: string;
  AccountId: number;
  AccountType: string;
  DepositDate: string;
  FromAccountNo: string;
  LedgerId: number;
  Remarks: string;
  RepeatMonths: number;
  // ScheduleDate: string;
  TotalDepositAmount: number;
  TransactionMethod: string;
  TransactionModels: CollectionLedgerModel[];
  CardNo: string;
  SecretKey: string;
  NameOnCard: string;
  EffectiveDay: number;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.TransactionNumber = '';
    this.TransactionType = '';
    this.AccountHolderName = '';
    this.AccountNo = '';
    this.AccountId = 0;
    this.AccountType = '';
    this.DepositDate = '';
    this.FromAccountNo = '';
    this.LedgerId = 0;
    this.Remarks = '';
    this.RepeatMonths = 0;
    // this.ScheduleDate = '';
    this.TotalDepositAmount = 0;
    this.TransactionMethod = '';
    this.TransactionModels = [];
    this.CardNo = '';
    this.SecretKey = '';
    this.NameOnCard = '';
    this.EffectiveDay = 0;
  }
}
