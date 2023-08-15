import { atom } from 'recoil';
import { SpaceUnitType } from '@/types/units';

export const spaceUnitState = atom({
  key: 'spaceUnitState', // unique ID (with respect to other atoms/selectors)
  default: 'sqft' as SpaceUnitType, // default value (aka initial value)
});
