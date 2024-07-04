export class FamilyAndRelativeViewModel {
  RelationTypeId: number = 0;
  RelationName: string | null = '';
  ParentPersonId: number = 0;
  RequestStatus: string | null = '';
  FullName: string | null = '';
  Gender: string | null = '';
  PersonId?: number = 0;
  Age?: number | undefined = 0;
  IsOrganization?: boolean = false;
  HasOperator?: boolean = false;
  MobileNumber?: number;
}
