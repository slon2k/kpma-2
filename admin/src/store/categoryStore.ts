import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { ICategory } from "../models";
import { api } from "../services";

export default class CategoryStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable categoriesInventory = new Map<number, ICategory>();
  @observable category: ICategory | null = null;

  @observable loadingCategories = false;
  @observable loadingCategory = false;
  @observable updatingCategory = false;
  @observable deletingCategory = false;
  @observable categoriesLoaded = false;

  @computed get categories() {
    return Array.from(this.categoriesInventory.values());
  }

  @action loadCategories = async () => {
    this.loadingCategories = true;
    try {
      const items = await api.Categories.getList();
      runInAction(() => {
        items.forEach((item) => {
          this.categoriesInventory.set(item.id, item);
        });
        this.loadingCategories = false;
        this.categoriesLoaded = true;
      });
    } catch (error) {
      runInAction(() => (this.loadingCategories = false));
      console.error(error);
    }
  };

  @action loadCategory = async (categoryId: number) => {
    this.loadingCategory = true;
    try {
      const item = await api.Categories.getDetails(categoryId);
      runInAction(() => {
        this.categoriesInventory.set(item.id, item);
        this.category = item;
        this.loadingCategory = false;
      });
    } catch (error) {
      runInAction(() => (this.loadingCategory = false));
      console.error(error);
    }
  };

  @action createCategory = async (category: ICategory) => {
    this.updatingCategory = true;
    try {
      const newCategory = await api.Categories.create(category);
      runInAction(() => {
        this.category = newCategory;
        this.categoriesInventory.set(newCategory.id, newCategory);
        this.updatingCategory = false;
      });
    } catch (error) {
      runInAction(() => (this.updatingCategory = false));
      console.error(error);
    }
  };

  @action deleteCategory = async (id: number) => {
    this.deletingCategory = true;
    try {
      await api.Categories.delete(id);
      runInAction(() => {
        this.category = null;
        this.categoriesInventory.delete(id);
        this.deletingCategory = false;
      });
    } catch (error) {
      runInAction(() => (this.deletingCategory = false));
      console.error(error);
    }
  };

  @action updateCategory = async (category: ICategory) => {
    this.updatingCategory = true;
    try {
      await api.Categories.update(category);
      runInAction(() => {
        this.category = category;
        this.categoriesInventory.set(category.id, category);
        this.updatingCategory = false;
      });
    } catch (error) {
      runInAction(() => (this.updatingCategory = false));
      console.error(error);
    }
  };

  @action setCategory = (id: number) =>
    (this.category = this.categoriesInventory.get(id) || null);

  @action clearCategory = () => (this.category = null);
}
