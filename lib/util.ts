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

interface AnyObject {
  [key: string]: any;
}

export const removeUndefinedValues = (obj: AnyObject): AnyObject => {
  return Object.entries(obj).reduce((acc: AnyObject, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export type Variant = { name: string; values: string[] };
export type Combination = { name: string; value: string }[];

export const generateCombinations = (
  variantsInfo: Variant[],
): Combination[] => {
  return variantsInfo.reduce<Combination[]>(
    (acc, { name, values }) =>
      acc.flatMap((existingCombination) =>
        values.map((value) => [...existingCombination, { name, value }]),
      ),
    [[]] as Combination[],
  );
};
