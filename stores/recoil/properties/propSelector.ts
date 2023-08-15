import { selector } from 'recoil';
import { propertiesAtom } from './propAtom';

export const propSelector = selector({
  key: 'propSelector', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => get(propertiesAtom),
});
