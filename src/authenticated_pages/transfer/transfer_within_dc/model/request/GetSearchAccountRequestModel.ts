import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class GetSearchAccountRequestModel extends BaseRequestModel {
  //   AccNo: string;
  //   CardNo: string;
  //   NameOnCard: string;
  TransferToAcc: string;
  //   RecipientName: string;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    // this.AccNo = '';
    // this.CardNo = '';
    // this.NameOnCard = '';
    this.TransferToAcc = '';
    // this.RecipientName = '';
  }
}
