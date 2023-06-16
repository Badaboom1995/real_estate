export const strings = {
  addSpaces: (str: string): string =>
    str
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/\d{3}(?=\d)/g, '$& ')
      .split('')
      .reverse()
      .join(''),
};
