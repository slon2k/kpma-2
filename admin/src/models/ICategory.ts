import { Dictionary } from "./Dictionary";

export interface ICategory {
  id: number;
  title: Dictionary;
  slug: string;
  description: Dictionary;
  isMenuItem: boolean;
  parentId: number | null;
}
