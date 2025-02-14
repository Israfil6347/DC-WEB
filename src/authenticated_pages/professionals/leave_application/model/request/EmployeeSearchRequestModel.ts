import { IAuthUserModel } from "authentication/login/model/data/IAuthUserModel";
import { BaseRequestModel } from "global_shared/model/request/BaseRequestModel";

export class EmployeeSearchRequestModel extends BaseRequestModel {
  searchText: string;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.searchText = "";
  }
}
