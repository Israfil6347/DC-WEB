export class TransferCollectionLedgerModel {
  AccountId: number = 0;
  AccountNumber: string = '';
  AccountTypeCode: string = '';
  AccountTypeName: string = '';
  DCAccountNo: string = '';
  UserId: number = 0;
  Balance: number = 0;
  WithdrawableBalance: number = 0;
  LedgerId: number = 0;
  AccountNominee?: string = '';
  LastPaidDate?: string = '';
  MaturityDate?: string = '';
  IsDefaulter?: boolean = false;
  Amount: number = 0;
  PlType: number = 0;
  isSelected: boolean = false;
}
