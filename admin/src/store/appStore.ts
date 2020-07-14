import { RootStore } from "./rootStore";
import { observable, action, reaction } from "mobx";

export default class AppStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }

  @observable appLoaded = false;

  @observable token = window.localStorage.getItem("jwt");

  @action setToken = (token: string | null) => (this.token = token);

  @action setAppLoaded = () => (this.appLoaded = true);
}
