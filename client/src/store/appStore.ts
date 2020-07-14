import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export default class AppStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable appLoaded = false;
  @observable language = "ru";
  @observable position = 0;
  @observable menuOpen = false;

  @action setPosition = (value: number) => {
    this.position = value;
  };

  @action toggleMenuOpen = () => {
    this.menuOpen = !this.menuOpen;
  };

  @action setMenuOpen = (value: boolean) => {
    this.menuOpen = value;
  }

  @action setLanguage = (lang: string) => {
    this.language = lang;
  };

  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}
