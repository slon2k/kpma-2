import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IUser, IUserCredentials } from "../models";
import { api } from "../services";

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (credentials: IUserCredentials) => {
    try {
      const user = await api.User.login(credentials);
      runInAction(() => (this.user = user));
      this.rootStore.appStore.setToken(user.token);
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const user = await api.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.error(error);
    }
  };

  @action logout = () => {
    this.rootStore.appStore.setToken(null);
    this.user = null;
  };
}
