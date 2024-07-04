import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class CounterInformationRequestModel extends BaseRequestModel {
  AccountNo: string;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.AccountNo = '';
  }
}
