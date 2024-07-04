import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class CardLockRequestModel extends BaseRequestModel {
  NameOnCard: string | null | undefined;
  CardNo: string | null | undefined;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.NameOnCard = '';
    this.CardNo = '';
  }
}
