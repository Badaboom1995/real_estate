import { atom } from 'recoil';

export const dictsAtom = atom({
  key: 'dicts',
  default: {
    types: [] as string[],
    locations: [] as { parent: string; children: string[] }[],
  },
});
