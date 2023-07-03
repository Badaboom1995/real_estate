import React from 'react';
import { rootStore, IStore } from '@/stores/rootStore';

export const StoreContext = React.createContext<IStore>(rootStore);

export const StoreProvider = ({ children }: any) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};
