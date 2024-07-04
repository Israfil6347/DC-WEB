import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class AddFamilyRequestModel extends BaseRequestModel {
  ChildPersonId: number;

  RelationTypeCode: string | null;
  SearchText: string | null;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.ChildPersonId = 0;

    this.RelationTypeCode = '';
    this.SearchText = '';
  }
}
