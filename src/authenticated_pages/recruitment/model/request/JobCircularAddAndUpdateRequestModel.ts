import { IAuthUserModel } from 'authentication/login/model/data/IAuthUserModel';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';

export class JobCircularAddAndUpdateRequestModel extends BaseRequestModel {
  jobPosition: string;
  organizationName: string;
  totalNumberOfVacancy: string;
  jobContext: string;
  jobResponsibility: string;
  employmentStatus: string;
  educationalRequirements: string;
  experienceRequirements: string;
  additionalRequirements: string;
  religionId: string;
  age: string;
  gender: string;
  jobLocation: string;
  salary: string;
  compensationAndOtherBenefits: string;
  applicationDeadline: string;
  contactInfo: string;
  jobCircularStatus: string;
  updatedBy: number;
  remarks?: string;
  publishedDate?: string;
  jobCircularId?: number;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.jobPosition = '';
    this.organizationName = '';
    this.totalNumberOfVacancy = '';
    this.jobContext = '';
    this.jobResponsibility = '';
    this.employmentStatus = '';
    this.educationalRequirements = '';
    this.experienceRequirements = '';
    this.additionalRequirements = '';
    this.religionId = '';
    this.age = '';
    this.gender = '';
    this.jobLocation = '';
    this.salary = '';
    this.compensationAndOtherBenefits = '';
    this.applicationDeadline = '';
    this.contactInfo = '';
    this.jobCircularStatus = '';
    this.updatedBy = 0;
    this.remarks = '';
    this.publishedDate = '';
    this.jobCircularId = 0;
  }
}
