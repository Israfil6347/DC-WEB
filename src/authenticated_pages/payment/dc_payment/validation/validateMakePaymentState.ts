import { isEmpty, isNegativeNumber } from 'global_shared/utils/validations';

export const validateMakePaymentState = (
  fieldName: string,
  fieldValue: any,
  WithdrawableBalance: number
) => {
  switch (fieldName) {
    case 'ServiceName':
      if (isEmpty(fieldValue)) {
        return 'Please enter service name';
      }
      return '';
    case 'Amount':
      if (isEmpty(fieldValue)) {
        return 'Please enter valid amount';
      }
      if (isNegativeNumber(fieldValue)) {
        return 'Please enter valid amount';
      }
      if (parseInt(fieldValue) > WithdrawableBalance) {
        return 'Cross  withdrawable amount';
      }
      return '';
    case 'NotifyPersonId':
      if (isEmpty(fieldValue)) {
        return 'Please enter Notify Person';
      }
      return '';
    case 'selectNotifyPerson':
      if (isEmpty(fieldValue)) {
        return 'Please enter Notify Person';
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
    case 'AccountTypeName':
      if (isEmpty(fieldValue)) {
        return 'Please select account type';
      }
      return '';

    default:
      return '';
  }
};
