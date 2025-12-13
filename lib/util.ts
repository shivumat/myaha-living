import { Products } from '#/context/ProductContext';
import Colors from '#/ui/colors/colors';

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

export const searchProducts = (
  products: Products,
  searchString: string,
): Products => {
  if (!searchString.trim()) return [];
  const searchTerm = searchString.toLowerCase();

  return products
    .map((product) => {
      let score = 0;

      // Match in Product Title (Highest Weight)
      if (product.title.toLowerCase().includes(searchTerm)) score += 5;

      // Match in Product Description
      if (product.description.toLowerCase().includes(searchTerm)) score += 4;

      // Match in Tags
      if (
        product.tags.some(
          (tag) =>
            typeof tag === 'string' && tag.toLowerCase().includes(searchTerm),
        )
      )
        score += 3;

      // Match in Variants (Material, Finish, Dimensions, Variant Info)
      product.variants.forEach((variant) => {
        if (
          variant.material?.toLowerCase().includes(searchTerm) ||
          variant.finish?.toLowerCase().includes(searchTerm) ||
          variant.dimensions?.toLowerCase().includes(searchTerm)
        ) {
          score += 2;
        }

        if (
          variant.variantInfo.some(
            (info) =>
              info.name.toLowerCase().includes(searchTerm) ||
              info.value.toLowerCase().includes(searchTerm),
          )
        ) {
          score += 2;
        }
      });

      // Match in Collections
      if (
        product.collections.some((collection) =>
          collection.title.toLowerCase().includes(searchTerm),
        )
      ) {
        score += 1;
      }

      return { product, score };
    })
    .filter(({ score }) => score > 0) // Remove products with no match
    .sort((a, b) => b.score - a.score) // Sort by highest score
    .map(({ product }) => product);
};

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export function formatPrice(
  amount: number,
  fractionDigits: number = 2,
): string {
  return `${amount.toLocaleString('en-IN', { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })}`;
}

export const mergeHexColorsWithWeights = (
  colors: { hex: string; weight: number }[],
): string => {
  if (colors.length === 0) return `${Colors.black}`; // Default to black if no colors provided

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, ''); // Remove #
    if (hex.length === 3)
      hex = hex
        .split('')
        .map((h) => h + h)
        .join(''); // Convert 3-char hex to 6-char
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) =>
    `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;

  let totalWeight = 0;
  let totalRgb = { r: 0, g: 0, b: 0 };

  // Apply weights to RGB values
  colors.forEach(({ hex, weight }) => {
    const rgb = hexToRgb(hex);
    totalRgb.r += rgb.r * weight;
    totalRgb.g += rgb.g * weight;
    totalRgb.b += rgb.b * weight;
    totalWeight += weight;
  });

  // Normalize RGB values
  const avgRgb = {
    r: Math.round(totalRgb.r / totalWeight),
    g: Math.round(totalRgb.g / totalWeight),
    b: Math.round(totalRgb.b / totalWeight),
  };

  return rgbToHex(avgRgb.r, avgRgb.g, avgRgb.b);
};

// lib/localStorageUtils.ts

const LOCAL_STORAGE_KEY = 'lastViewedProductIds';

export function updateLastViewedProducts(productId: string) {
  if (typeof window === 'undefined') return;

  try {
    const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
    let ids: string[] = existing ? JSON.parse(existing) : [];

    // Remove the product if it already exists
    ids = ids.filter((id) => id !== productId);

    // Add it to the beginning
    ids.unshift(productId);

    // Limit to last 4
    if (ids.length > 4) {
      ids = ids.slice(0, 4);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Error updating last viewed products:', error);
  }
}

export function getLastViewedProducts(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const ids = localStorage.getItem(LOCAL_STORAGE_KEY);
    return ids ? JSON.parse(ids) : [];
  } catch {
    return [];
  }
}
