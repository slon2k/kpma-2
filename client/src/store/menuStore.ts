import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { IMenuItem } from "../models";
import { api } from "../services";

export default class MenuStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable menuItems: IMenuItem[] = [];
  @observable loadingMenu = false;

  @action loadMenu = async () => {
    this.loadingMenu = true;
    try {
      const items = await api.Menu.get();
      runInAction(() => {
        this.menuItems = items;
        console.log(items);
        this.loadingMenu = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingMenu = false));
      console.error(error);
    }
  };
}
