import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class PersonDependentAccountRequestModel extends BaseRequestModel {
  DependentPersonId: number;
  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.DependentPersonId = 0;
  }
}
