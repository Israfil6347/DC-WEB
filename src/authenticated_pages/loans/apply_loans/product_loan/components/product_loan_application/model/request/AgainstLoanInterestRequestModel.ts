import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class AgainstLoanInterestRequestModel extends BaseRequestModel {
  loanApplication: {
    AccountIds: string;
    LoanProductCode: string;
    SuretyAccountIds: string;
  };

  constructor(authUser: IAuthUserModel, loanApplication: any) {
    super(authUser);
    this.loanApplication = loanApplication;
  }
}
