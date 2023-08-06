import Payment from 'payment';

export const getCardType = (cardNumber: string): string => {
  return Payment.fns.cardType(cardNumber);
};

export const getCardIcon = (cardType: string): string => {
  switch (cardType) {
    case 'visa':
      return '../assets/svg/ic_visa.svg';
    case 'mastercard':
      return '../assets/svg/ic_mastercard.svg';
    case 'amex':
      return 'amex';
    case 'discover':
      return 'discover';
    case 'diners':
      return 'diners';
    case 'jcb':
      return 'jcb';
    case 'unionpay':
      return 'unionpay';
    case 'maestro':
      return 'maestro';
    case 'hipercard':
      return 'hipercard';
    case 'hiper':
      return 'hiper';
    case 'elo':
      return 'elo';
    case 'aura':
      return 'aura';
    default:
      return '../assets/svg/ic_visa.svg';
  }
};

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value: string) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`;
      break;
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
        12,
        19
      )}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value: string, prevValue?: string, allValues: { number?: string } = { number: '' }) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === 'amex' ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value: string) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}
