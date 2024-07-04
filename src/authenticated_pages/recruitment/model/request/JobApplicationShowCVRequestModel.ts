import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class JobApplicationShowCVRequestModel extends BaseRequestModel {
  JobApplicationId: number;
  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.JobApplicationId = 0;
  }
}
