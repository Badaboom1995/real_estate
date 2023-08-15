import { atom } from 'recoil';
import { PropertyType } from '@/types/Property';

export const propertiesAtom = atom({
  key: 'propertiesList',
  default: { count: 0, entities: [], points: [] } as {
    count: number;
    entities?: PropertyType[];
    points?: { id: string; lat: string; lon: string }[];
  },
});
