import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class CollectionAccountListRequestModel extends BaseRequestModel {
  SearchText: string | undefined;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.SearchText = '';
  }
}
