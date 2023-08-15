export const units = {
  getPrice: (price: number, currency: string): number => {
    const priceString = price.toString();
    const priceLength = priceString.length;
    return 0;
  },
  getArea: (areaInFeet: number, units: 'sqft' | 'sqmt'): number => {
    if (!areaInFeet) return 0;
    let areaCurrent = areaInFeet;
    if (units === 'sqmt') {
      areaCurrent = areaCurrent / 10.764;
    }
    return parseInt(areaCurrent?.toFixed(2));
  },
};
