import { IImage } from "./IImage";
import { Dictionary } from "./Dictionary";

export interface IArticle {
  id: number;
  slug: string;
  title: Dictionary;
  dateCreated: Date;
  datePublished: Date;
  isPublished: boolean;
  isFeatured: boolean;
  isMenuItem: boolean;
  summary: Dictionary;
  introduction: Dictionary;
  body: Dictionary;
  categoryId: number;
  categoryName: string;
  picture?: IImage;
  gallery: IImage[];
}
