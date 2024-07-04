const { isEmpty } = require('global_shared/utils/validations');

export const validateCollectionLedgerState = (
  fieldName: string,
  fieldValue: any,
  collectionLedgerState: any
) => {
  switch (fieldName) {
    // case 'Amount':
    //   if (isEmpty(String(fieldValue))) {
    //     return 'Please enter valid amount';
    //   } else if (collectionLedgerState?.AccountTypeCode === '17') {
    //     if (fieldValue < 500) {
    //       return 'Minimum deposit 500 ৳';
    //     }
    //   } else if (collectionLedgerState?.AccountTypeCode === '16') {
    //     if (fieldValue < 10) {
    //       return 'Minimum deposit 10 ৳';
    //     }
    //   }
    //   return '';
    default:
      return '';
  }
};
