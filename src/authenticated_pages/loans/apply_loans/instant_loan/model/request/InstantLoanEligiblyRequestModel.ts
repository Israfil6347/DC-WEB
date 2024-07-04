import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class InstantLoanEligiblyRequestModel extends BaseRequestModel {
  IsTopUp: boolean;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.IsTopUp = false;
  }
}
