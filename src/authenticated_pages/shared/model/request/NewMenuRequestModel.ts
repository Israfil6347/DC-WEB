import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class NewMenuRequestModel extends BaseRequestModel {
  MenuID: number | undefined;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.MenuID = 0;
  }
}
