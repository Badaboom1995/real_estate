import { types, Instance } from 'mobx-state-tree';
import { searchPageDefault, SearchPageModel } from './searchPageStore';

export type ISearchPageStore = Instance<typeof RootModel>;

const RootModel = types.model({
  SearchPageStore: SearchPageModel,
});

export type IStore = Instance<typeof RootModel>;
export const rootStore: IStore = RootModel.create({
  SearchPageStore: searchPageDefault,
});
