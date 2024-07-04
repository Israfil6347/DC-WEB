const { isEmpty } = require('global_shared/utils/validations');

export const bKashTransferValidation = (
  fieldName: string,
  fieldValue: any,
  WithdrawableBalance?: any
) => {
  switch (fieldName) {
    case 'CardAccount':
      if (isEmpty(fieldValue)) {
        return 'Please select card account';
      }
      return '';
    case 'AccountTypeName':
      if (isEmpty(fieldValue)) {
        return 'Please select card account';
      }
      return '';
    case 'CardNo':
      if (isEmpty(fieldValue)) {
        return 'Please select a card';
      }
      return '';
    case 'Amount':
      if (isEmpty(fieldValue)) {
        return 'Please enter amount';
      }
      if (fieldValue > WithdrawableBalance) {
        return 'You do not have sufficient balance';
      }
      return '';
    case 'CardPIN':
      if (isEmpty(fieldValue)) {
        return 'Please enter PIN';
      }
      if (!isEmpty(fieldValue)) {
        if (fieldValue.length !== 4) {
          return `PIN must be four digit`;
        }
      }
      return '';
    default:
      return '';
  }
};
