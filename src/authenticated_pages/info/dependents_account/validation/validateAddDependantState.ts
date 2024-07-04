import { isEmpty } from 'global_shared/utils/validations';

export const validateAddDependantState = (
  fieldName: string,
  fieldValue: any
) => {
  switch (fieldName) {
    case 'MobileNumber':
      if (isEmpty(fieldValue)) {
        return 'Please enter service name';
      }
      return '';
    case 'Dependent':
      if (isEmpty(fieldValue)) {
        return 'Please enter service name';
      }
      return '';
    case 'dependentAccounts':
      if (isEmpty(fieldValue)) {
        return 'Please enter service name';
      }
      return '';

    default:
      return '';
  }
};
