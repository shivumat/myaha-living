export const getCurrentTimeStamp = () => {
  let date = new Date();

  return date
    .toLocaleString('en-US', {
      weekday: 'short',

      month: 'short',

      day: '2-digit',

      year: 'numeric',

      hour: '2-digit',

      minute: '2-digit',

      second: '2-digit',
    })
    .replace(/\s/g, '');
};

export const getRandomIntInclusive = (max: number, min: number = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomSubArray = <T>(array: T[], count: number): T[] => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'INR':
      return '₹';
    default:
      return currency;
  }
};
