import { isEmpty, isNumberBetween } from 'global_shared/utils/validations';

export const validateCounterInformationState = (
  fieldName: string,
  fieldValue: any
) => {
  switch (fieldName) {
    case 'AccountNo':
      if (isEmpty(fieldValue)) {
        return 'Enter an Account Number';
      }
      return '';

    default:
      return '';
  }
};
