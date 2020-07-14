import { Dictionary } from "./Dictionary";

export interface IMenuItem {
  title: Dictionary;
  path: string;
  subItems: IMenuItem[];
}