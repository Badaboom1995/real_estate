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
  removeDuplicateSubstring: (s: string) => {
    for (let i = 0; i < s.length; i++) {
      const substring = s.slice(0, i);
      if (substring && s.slice(i).startsWith(substring)) {
        return substring;
      }
    }
    return s;
  },
};
