import { isEmpty, isNumberBetween } from 'global_shared/utils/validations';

export const validateGenerateOneTimeQRState = (
  fieldName: string,
  fieldValue: any,
  WithdrawableBalance: number
) => {
  switch (fieldName) {
    case 'Amount':
      if (isEmpty(fieldValue)) {
        return 'Enter an amount';
      }
      if (parseInt(fieldValue) < 1) {
        return 'Enter an amount';
      }
      if (parseFloat(fieldValue) % 500 !== 0) {
        return 'Amount must be multiplied by ' + 500 + '/-';
      }

      if (parseFloat(fieldValue) >= 500) {
        if (!isNumberBetween(parseFloat(fieldValue), 500, 20000)) {
          return 'Minimum withdraw amount is  20000 ';
        }
      }
      if (parseFloat(fieldValue) > WithdrawableBalance) {
        return 'You do not have sufficient balance';
      }
      return '';
    case 'AccountTypeName':
      if (isEmpty(fieldValue)) {
        return 'Please select account type';
      }
      return '';
    case 'CardAccount':
      if (isEmpty(fieldValue)) {
        return 'Please select card account';
      }
      return '';
    case 'CardNo':
      if (isEmpty(fieldValue)) {
        return 'Please select a card';
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
