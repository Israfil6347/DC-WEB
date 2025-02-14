import { AuthUserModel } from 'authentication/login/model/data/AuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

/**========================================================================
 * ?                                ABOUT
 * @author         :  name_on_card
 * @designation    :  Software Developer
 * @email          :  newtonmitro@gmail.com
 * @description    :
 * @createdOn      :  01 July 2023
 * @updatedBy      :  Israfil
 * @updatedOn      :  04 July 2023
 *========================================================================**/
export class GetAccountRequestModel extends BaseRequestModel {
  AccHolderPersonId: number;
  constructor(authUser: AuthUserModel) {
    super(authUser);
    this.AccHolderPersonId = 0;
  }
}
