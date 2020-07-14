import { createContext } from "react";
import { configure } from "mobx";
import MenuStore from "./menuStore";
import ArticleStore from "./articleStore";
import AppStore from "./appStore";

configure({ enforceActions: "always" });

export class RootStore {
  menuStore: MenuStore;
  articleStore: ArticleStore;
  appStore: AppStore;

  constructor() {
    this.menuStore = new MenuStore(this);
    this.articleStore = new ArticleStore(this);
    this.appStore = new AppStore(this);
  }
}

export const StoreContext = createContext(new RootStore());
