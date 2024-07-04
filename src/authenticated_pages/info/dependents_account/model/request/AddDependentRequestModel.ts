import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

interface DependentAccountOperators {
  AccountOperatorId: number;
  AccountHolderInfoId: number;
}
export class AddDependentRequestModel extends BaseRequestModel {
  AccountOperators: DependentAccountOperators[];
  OTPValue: string;
  OTPRegId: string | null;
  Remarks: string;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.AccountOperators = [];
    this.OTPValue = '';
    this.OTPRegId = '';
    this.Remarks = '';
  }
}
