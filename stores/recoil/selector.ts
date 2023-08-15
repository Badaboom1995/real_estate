import { selector } from 'recoil';
import { spaceUnitState } from './atom';

export const lengthState = selector({
  key: 'lengthState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const name = get(spaceUnitState);
    const lengthOfName = name.length;
    return lengthOfName;
  },
});
