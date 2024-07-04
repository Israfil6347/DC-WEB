const { isEmpty } = require('global_shared/utils/validations');

export const validateFixedDepositState = (
  fieldName: string,
  fieldValue: any,
  MinimumDepositAmount?: any,
  WithdrawableBalance?: any
) => {
  switch (fieldName) {
    case 'accountHolder':
      if (isEmpty(fieldValue)) {
        return 'Please select account holder';
      }
      return '';
    case 'selectedNominees':
      if (!fieldValue || fieldValue.length === 0) {
        return 'Please add selected nominees ';
      }
      return '';
    case 'tenure':
      if (isEmpty(fieldValue)) {
        return 'Please select Year';
      }
      return '';
    case 'amount':
      if (isEmpty(fieldValue)) {
        return 'Please select Amount';
      } else if (fieldValue < parseInt(MinimumDepositAmount)) {
        return `Amount must be more than ${MinimumDepositAmount} `;
      } else if (fieldValue > parseInt(WithdrawableBalance)) {
        return `You do not have sufficient balance `;
      } else if (parseFloat(fieldValue) % 1000 !== 0) {
        return 'Amount must be multiplied by ' + 1000 + '/-';
      }
      return '';
    case 'selectedNomineeName':
      if (isEmpty(fieldValue)) {
        return 'Please selected Nominee';
      }
      return '';
    case 'nomineePercentage':
      if (isEmpty(fieldValue)) {
        return 'Please enter nominee percentage';
      } else if (fieldValue > 100) {
        return 'You can add up to percentage 100 ';
      }
      return '';
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
