import { createContext } from "react";
import { configure } from "mobx";
import ArticleStore from "./articleStore";
import AppStore from "./appStore";
import CategoryStore from "./categoryStore";
import ImageStore from "./imageStore";
import UserStore from "./userStore";

configure({ enforceActions: "always" });

export class RootStore {
  articleStore: ArticleStore;
  appStore: AppStore;
  categoryStore: CategoryStore;
  imageStore: ImageStore;
  userStore: UserStore;

  constructor() {
    this.articleStore = new ArticleStore(this);
    this.appStore = new AppStore(this);
    this.categoryStore = new CategoryStore(this);
    this.imageStore = new ImageStore(this);
    this.userStore = new UserStore(this);
  }
}

export const StoreContext = createContext(new RootStore());
