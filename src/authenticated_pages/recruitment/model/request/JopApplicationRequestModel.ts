import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class JopApplicationRequestModel extends BaseRequestModel {
  //   paginationRequestObj: any;
  JobCircularId: string | undefined;
  searchText: string;
  pageSize: number;
  startRec: number;
  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.JobCircularId = '';
    this.searchText = '';
    this.pageSize = 0;
    this.startRec = 0;
  }
}
